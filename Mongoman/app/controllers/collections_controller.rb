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
          format.all {render json: @data }
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

  def destroy
    database_name = params[:database_name]
    collection_name = params[:id]
    notice = "Collection " + collection_name + " dropped from db " + database_name
    database =  @connection.db(database_name)
    database[collection_name].drop()
    notice = "Collection " + collection_name + " dropped from db " + database_name
    respond_to do |format|
         format.json {render json: {:notice => notice }}
      end
  end





end
