class CreateRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :requests do |t|
      t.string :title
      t.text :description
      t.float :lat
      t.float :lng
      t.string :request_type
      t.text :address
      
      t.boolean :fulfilled, :default => false

      t.timestamps
    end
  end
end
