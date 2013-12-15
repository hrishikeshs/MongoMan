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
    db_names = dbs.keys.sort()
    @data = db_names.map do |e| {
              name: e,
              size: (dbs[e] * 9.3e-10).round(2),      #convert size in bytes to gigabytes
              collection_count: @connection[e].collection_names.length,
              indexes: @connection[e]['system.indexes'].find().count
            }end
    @data
  end

  def create  
    new_database_name = params[:dbname]
    new_database = @connection.db(new_database_name)
    new_database['new_collection'].insert({})
    collection = new_database['new_collection']
    collection.drop()
    notice = "New Database " + new_database_name + " Successfully Created"
    respond_to do |format|
        format.json {render json: {:notice => notice } }
      end
  end



  def destroy
    database = params[:id]
    @connection.drop_database(database)
    notice = "Dropped Database " + database
    respond_to do |format|
        format.json {render json: {:notice => notice } }
      end
  end


end
