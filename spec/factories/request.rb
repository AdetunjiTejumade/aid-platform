
FactoryBot.define do
    factory :request do
      title { Faker::Lorem.word }
      description { Faker::Lorem.paragraphs }
      lat { Faker::Number.decimal_part(6) }
      lng { Faker::Number.decimal_part(digits: 6) }
      request_type {"one_time_task"}
      address { Faker::Lorem.paragraphs }
      user_id {nil}
      fulfilled {false}
    end
  end