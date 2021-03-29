class ConversationChannel < ApplicationCable::Channel
  def subscribed
    @conversations = Conversation.find_by(id: params[:conversations])
    stream_for @conversations
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def received(data)
    ConversationssChannel.broadcast_to(@conversations, {conversations: @conversations, users: @conversations.users, messages: @conversations.messages})
  end
end
