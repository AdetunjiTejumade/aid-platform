url = URI.parse(ENV.fetch("REDIS_URL") { "redis://localhost:6379/1" })
REDIS = Redis.new(url: url)