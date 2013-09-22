json.array!(@databases) do |database|
  json.extract! database, 
  json.url database_url(database, format: :json)
end
