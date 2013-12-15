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

end
