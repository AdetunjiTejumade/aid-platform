FactoryBot.define do
    factory :conversation do
        name { Faker::Lorem.word }
    end
  end