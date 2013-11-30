class DatabasesController < ApplicationController

  def index   
    @data = db_info
    respond_to do |format|
      format.html
      format.json {render json: @data }
    end
  end



  def db_info
    dbs = @connection.database_info
    db_names = dbs.keys
    @data = db_names.map do |e| {
              name: e,
              size: (dbs[e] * 9.3e-10).round(2),      #convert size in bytes to gigabytes
              collection_count: @connection[e].collection_names.length,
              indexes: @connection[e]['system.indexes'].find().count
            }end
    @data
  end
end
