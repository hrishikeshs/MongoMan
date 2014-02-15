class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception

  before_filter :set_connection, :set_database_and_collection

	def set_connection
    @connection = MongoConfig.connection
	end

  def set_database_and_collection
    if params[:database_name]
      @database = @connection.db(params[:database_name])
    end

    if params[:collection_name]
      @collection = @database[params[:collection_name]]
    end

  end

end
