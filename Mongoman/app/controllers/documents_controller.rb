class DocumentsController < ApplicationController

	def show
		collection_name = params[:collection]
		database_name = params[:database]
		database =	@connection.db(database_name)
		collection = database[collection_name]
    @data = {}
		@data[:documents] = collection.find().sort({:_id => -1}).limit(600).map  do |e|
				e = self.BsonFieldsToString(e)
			end
		respond_to do |format|
	      format.json {render json: @data }
	      format.all {render json: @data }
	    end
	end

	def query
	end

	def BsonFieldsToString(x)
		if x.is_a? BSON::ObjectId
			'ObjectId("' + x.to_s + '")'
		elsif x.is_a? BSON::Binary
			x.to_s
		elsif x.is_a? Time
			'ISODate("' + x.iso8601 + '")'
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
		database_name = params[:database_name]
		collection_name = params[:collection_name]
		new_document = JSON.parse(params[:newdoc])
		db = @connection.db(database_name)
		collection = db[collection_name]
		begin
			id = collection.insert(new_document)
			notice = "Document added to collection " + collection_name + " has id = " + id.to_s
		rescue 
			notice =  db.command({:getLastError => 1})['err']
		end
		respond_to do |format|
	      format.json {render json: {:notice => notice}}
	    end
	end



	def destroy
		database_name = params[:database_name]
		collection_name = params[:collection_name]
=begin
Some documents have ids which are not just BSON::ObjectIds. Crazy I know. right?
Hence this circus
=end		
		begin
			document_id = params[:id] != -1 ? BSON::ObjectId(params[:id]) : JSON.parse(params[:document_index])
		rescue
			document_id = JSON params[:document_index]
		end
		db = @connection.db(database_name)
		collection = db[collection_name]
		deleting_document = collection.find_one("_id" => document_id)
		puts deleting_document
		puts document_id
		puts "_id" => document_id
		puts "=============================="
		if deleting_document 
			collection.remove("_id" => document_id)
			notice= "Document with id  " + params[:id] + " successfully deleted."
		else
			notice = "Unable to delete the document."
		end
		respond_to do |format|
	    	 format.json {render json: {:notice => notice, :removed_document => deleting_document}}
	    end
	end


end
