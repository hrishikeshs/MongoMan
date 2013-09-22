class Database
  include MongoMapper::Document

  key :name, String
  many :collections
  
  def index
    
  end

end
