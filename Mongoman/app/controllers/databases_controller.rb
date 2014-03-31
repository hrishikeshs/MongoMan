class DatabasesController < ApplicationController

  def index
    data = db_info
    respond_to do |format|
      format.html
      format.json {render json: data }
      format.all {render json: data }
    end
  end

  def db_info
    dbs = @connection.database_info
    db_names = dbs.keys.sort()
    data = db_names.map do |e| {
              name: e,
              size: (dbs[e] * 9.3e-10).round(2),      #convert size in bytes to gigabytes
              collection_count: @connection[e].collection_names.length,
              indexes: @connection[e]['system.indexes'].find().count
            }
          end
    data
  end

  def create
    @database['new_collection'].insert({})
    collection = @database['new_collection']
    collection.drop()
    notice = "New Database " + params[:database_name] + " Successfully Created"
    respond_to do |format|
        format.json {render json: {:notice => notice } }
      end
  end


  def copy
    begin
      @connection.copy_database(params[:database_name], params[:name])
      notice = "Successfully copied"
    rescue
      notice = @database.command({:getLastError => 1})['err']
    end
    respond_to do |format|
        format.json {render json: {:notice => "Successfully copied" } }
      end
  end

  def rename
    begin
      @connection.copy_database(params[:id], params[:new_name])
      notice = "Successfully Renamed"
      @connection.drop_database(params[:id])
    rescue
      notice = @database.command({:getLastError => 1})['err']
    end
    respond_to do |format|
        format.json {render json: {:notice => "Successfully Renamed" } }
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
