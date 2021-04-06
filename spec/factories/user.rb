FactoryBot.define do
    factory :user do
        first_name { Faker::Name.last_name }
        last_name { Faker::Name.name }
        email { Faker::Internet.email }
        password { Faker::Internet.password }
    end
  end