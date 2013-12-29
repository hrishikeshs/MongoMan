class CollectionsController < ApplicationController

	def show
		database_name = params[:id]
		database =	@connection.db(database_name)
		@collections = database.collection_names.sort().map  do |e| {
			stats: database[e].stats()
		}
		end	
		respond_to do |format|
      		format.json {render json: @collections }
		end
	end

	def create  
    new_collection_name = params[:collectionName]
    database = @connection.db(params[:db])
    database[new_collection_name].insert({})
    database[new_collection_name].remove
    notice = "New Collection " + new_collection_name + " Successfully Created"
    respond_to do |format|
        format.json {render json: {:notice => notice } }
      end
  end



end
