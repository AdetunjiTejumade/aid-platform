FactoryBot.define do
    factory :message do
        body { Faker::Lorem.paragraphs }
        conversation_id { nil }
        user_id { nil }
    end
  end