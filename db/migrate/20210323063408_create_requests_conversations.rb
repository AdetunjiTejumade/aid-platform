class CreateRequestsConversations < ActiveRecord::Migration[6.0]
  def change
    create_table :requests_conversations do |t|
      t.references :conversation, index: true
      t.references :request, index: true
      t.timestamps
    end
  end
end
