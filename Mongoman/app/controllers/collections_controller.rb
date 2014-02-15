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
    new_collection_name = params[:collection_name]
    @database[new_collection_name].insert({})
    @database[new_collection_name].remove
    notice = "New Collection " + new_collection_name + " Successfully Created"
    respond_to do |format|
        format.json {render json: {:notice => notice } }
      end
  end

  def destroy
    collection_name = params[:id]
    notice = "Collection " + collection_name + " dropped from db " + params[:database_name]
    @database[collection_name].drop()
    notice = "Collection " + collection_name + " dropped from db " + params[:database_name]
    respond_to do |format|
         format.json {render json: {:notice => notice }}
      end
  end





end
