FactoryBot.define do
    factory :requests_user do
        request_id {nil}
        user_id {nil}
        fulfilled {false}
    end
end