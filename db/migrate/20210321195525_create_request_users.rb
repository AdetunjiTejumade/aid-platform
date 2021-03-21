class CreateRequestUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :request_users do |t|
      t.integer :request_id
      t.integer :user_id
      t.timestamps
    end
  end
end
