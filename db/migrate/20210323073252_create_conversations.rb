class CreateConversations < ActiveRecord::Migration[6.0]
  def change
    create_table :conversations do |t|
        t.string :name
        t.integer :sender_id
        t.integer :receiver_id
        t.integer :request_id
        t.boolean :patched,  :default => false
      t.timestamps
    end
  end
end
