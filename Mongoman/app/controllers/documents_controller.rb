class DocumentsController < ApplicationController

	def show
		collection_name = params[:id]
		database_name = params[:database]
		database =	@connection.db(database_name)
		collection = database[collection_name]
    @data = {}
		@data[:documents] = collection.find().sort({:_id => -1}).limit(600)
		respond_to do |format|
	      format.json {render json: @data }
	    end
	end

	def query
	end



	def destroy
		database_name = params[:database_name]
		collection_name = params[:collection_name]
=begin
Some documents have ids which are not just BSON::ObjectIds. Crazy I know. right?
Hence this circus
=end		
		begin
			document_id = BSON::ObjectId(params[:id]) 
		rescue
			document_id = JSON.parse(params[:id])
		end
		db = @connection.db(database_name)
		collection = db[collection_name]
		deleting_document = collection.find_one("_id" => document_id)
		collection.remove("_id" => document_id)
		notice= "Document with id  " + params[:id] + " successfully deleted."
		respond_to do |format|
	      format.json {render json: {:notice => notice, :removed_document => deleting_document}}
	    end
	end


end
