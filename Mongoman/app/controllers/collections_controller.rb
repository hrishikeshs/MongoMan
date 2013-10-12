class CollectionsController < ApplicationController


	def index
		@data =	{"name" => "mongo", "type" => "db" }
		respond_to do |format|
      		format.json {render json: @data }
		end
	end




	def show
		database_name = params[:id]
		database =	@connection.db(database_name)
		@collections = database.collection_names.map  do |e| {
			stats: database[e].stats()
		}
		end	
		respond_to do |format|
      		format.json {render json: @collections }
		end
	end

end
