class RequestsUser < ApplicationRecord
    belongs_to :user
    belongs_to :request

    validates :request_id, presence: true
    validates :user_id, presence: true

end
