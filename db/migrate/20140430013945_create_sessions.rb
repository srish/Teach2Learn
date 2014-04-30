class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :status
      t.references :user, index: true
      t.references :lesson, index: true

      t.timestamps
    end
  end
end
