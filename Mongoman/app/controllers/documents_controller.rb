class DocumentsController < ApplicationController

	def show
		start_index = params[:from].to_i || 0
    data = {}
    if start_index == 0
    	data[:documents] = @collection.find().sort({:_id => -1}).limit(15)
    else
    	data[:documents] = @collection.find().sort({:_id => -1}).skip(start_index).limit(15)
    end

		data[:documents] = data[:documents].map  do |e|
				e = self.BsonFieldsToString(e)
			end

		data[:count] = @collection.find().count()
		respond_to do |format|
	      format.json {render json: data }
	      format.all {render json: data }
	    end
	end

	def search
    searchphrase =  params[:id]
    parsed_list = searchphrase.split(':')
    data = {}
    if parsed_list.length < 2
      id = BSON::ObjectId(searchphrase)
      data[:documents] = @collection.find("_id" => id).map do |e|
        e = self.BsonFieldsToString(e)
      end
      count = 1
    else
      field = parsed_list[0].strip!
      value = parsed_list.slice(1)
      value = Regexp.new(value.lstrip!)
      query = {}
      field.gsub! /\*/, "."
      query[field] = value
      count = collection.find(query).count()
      data[:documents] = collection.find(query).limit(300).map do |e|
        e = self.BsonFieldsToString(e)
      end
    end

    data[:count]  = count
    data[:notice] = count > 300 ? "Your regular expression matches over 300 documents. Consider refining it." : nil

    respond_to do |format|
        format.json {render json: data }
        format.all {render json: data }
    end
	end

	def BsonFieldsToString(x)
		if x.is_a? BSON::ObjectId
			"ObjectId('" + x.to_s + "')"
		elsif x.is_a? BSON::Binary
			x.to_s
		elsif x.is_a? Time
			"ISODate('" + x.iso8601 + "')"
		elsif x.is_a? Hash
			keys = x.keys
			for k in keys do
					x[k] = BsonFieldsToString(x[k])
			end
			x
		elsif x.is_a? Array
			x = x.map do |y|
				BsonFieldsToString(y)
			end
		else
			x
		end
	end

	def create
		json_string = request.body().to_a.join
		json_object =  JSON json_string
		new_document = construct_document(json_object)
		begin
			id = @collection.insert(new_document)
			notice = "Document added to collection " + collection_name + " has id = " + id.to_s
		rescue
			notice =  @database.command({:getLastError => 1})['err']
		end
		respond_to do |format|
	      format.json {render json: {:notice => notice}}
	    end
	end



	def destroy

=begin
Some documents have ids which are not just BSON::ObjectIds. Crazy I know. right?
Hence this circus
=end
		begin
			document_id = params[:id] != -1 ? BSON::ObjectId(params[:id]) : JSON.parse(params[:document_index])
		rescue
			document_id = JSON params[:document_index]
		end

		deleting_document = @collection.find_one("_id" => document_id)
		if deleting_document
			@collection.remove("_id" => document_id)
			notice= "Document with id  " + params[:id] + " successfully deleted."
		else
			notice = "Unable to delete the document."
		end
		respond_to do |format|
	    	 format.json {render json: {:notice => notice, :removed_document => deleting_document}}
	    end
	end

	def substitutions(value)
    substitution = value
    if value.is_a? String
		  if value.match 'ObjectId'
			 object_id = value.match /[0-9a-fA-F]{24}/
  			substitution =  BSON::ObjectId(object_id.to_s)
  		elsif value.match 'ISODate'
  			substitution =  Time.parse value.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/)[0]
  	  end
    end
    substitution
	end

	def construct_document(json_object)
		json_object.each do |key,value|
			if value.is_a? String
				json_object[key] = substitutions(value)
			elsif value.is_a? Hash
				json_object[key] = construct_document(value)
			elsif value.is_a? Array
				json_object[key] = value.map do |v|
					substitutions(v)
				end
			end
		end
		json_object
	end


	def update
		json_string = request.body().to_a[0]
    json_object =  JSON json_string
		mongo_document = construct_document(json_object)
    begin
			@collection.update({"_id" => mongo_document["_id"]}, mongo_document)
			notice = "Document with id  " + mongo_document['_id'].to_s + " successfully updated."
		rescue
			notice = db.command({:getLastError => 1})['err']
		end
		@data = {"notice" => notice}
		respond_to do |format|
	      format.json {render json: @data }
	      format.all {render json: @data }
	  end
	end



end
