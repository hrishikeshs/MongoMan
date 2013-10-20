class DocumentsController < ApplicationController

	def show
		collection_name = params[:id]
		database_name = params[:database]
		database =	@connection.db(database_name)
		collection = database[collection_name]
    @data = {}
		@data[:documents] = collection.find()
		respond_to do |format|
	      format.json {render json: @data }
	    end
	end

	def query
	end


end
