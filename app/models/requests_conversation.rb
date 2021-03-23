class RequestsConversation < ApplicationRecord
    belongs_to :conversation
    belongs_to :request


    validates :conversation_id, presence: true
    validates :request_id, presence: true

end
