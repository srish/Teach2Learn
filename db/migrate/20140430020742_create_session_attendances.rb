class CreateSessionAttendances < ActiveRecord::Migration
  def change
    create_table :session_attendances do |t|
      t.integer :rating
      t.string :comments
      t.references :session, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
