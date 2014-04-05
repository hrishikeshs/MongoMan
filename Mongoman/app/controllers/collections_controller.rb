class CollectionsController < ApplicationController

  def show
    database_name = params[:id]
    database =  @connection.db(database_name)
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

  def copy
    begin
      new_collection = @database[params[:copyas]]
      @database[params[:collection_name]].find().each {|document| new_collection.insert(document) }
      notice = "Successfully copied"
    rescue
      notice = @database.command({:getLastError => 1})['err']
    end
    respond_to do |format|
        format.json {render json: {:notice => "Successfully copied" } }
      end
  end

  def rename
    notice = ""
    begin
      @database.rename_collection(@collection.name, params[:new_name])
      notice = "Successfully Renamed"
    rescue
      notice = @database.command({:getLastError => 1})['err'] || "error"
    end
    respond_to do |format|
        format.json {render json: {:notice => notice } }
      end
  end

end
