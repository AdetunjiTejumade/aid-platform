class ConversationChannel < ApplicationCable::Channel
  def subscribed
    @conversation = Conversation.find_by(id: params[:conversations])
    stream_for @conversation
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def received(data)
    ConversationChannel.broadcast_to(@conversations, {conversations: @conversations, users: @conversations.users, messages: @conversations.messages})
  end
end
