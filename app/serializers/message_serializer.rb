class MessageSerializer < ActiveModel::Serializer
  attributes :id, :conversation_id, :user_id, :body, :created_at, :updated_at
end
