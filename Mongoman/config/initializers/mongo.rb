class MongoConfig
 
  class << self
    attr_accessor :connection
  end
end

connection = Mongo::Connection.new("localhost",27017)
db = connection.db()


MongoConfig.connection = connection

#disable parsing by rails because we don't have an adapter specification since we are using the native mongo driver 
Mongoman::Application.config.middleware.delete "ActionDispatch::ParamsParser"
