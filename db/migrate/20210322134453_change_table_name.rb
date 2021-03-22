class ChangeTableName < ActiveRecord::Migration[6.0]
  def change
    rename_table :request_users, :requests_users
  end
end
