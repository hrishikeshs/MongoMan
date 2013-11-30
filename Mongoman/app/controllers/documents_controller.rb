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
		id= 'BSON::ObjectId(' + "'" + params[:id] + "')"
		db = @connection.db(database_name)
		collection = db[collection_name]
		collection.remove('_id' => id)
		notice= "Document with id" + id + " successfully deleted"
		respond_to do |format|
	      format.json {render json: {:notice => notice}}
	    end

	end


end
