class MongoConfig
 
  class << self
    attr_accessor :connection
  end
end

connection = Mongo::Connection.new("localhost",27017)
db = connection.db()


MongoConfig.connection = connection
