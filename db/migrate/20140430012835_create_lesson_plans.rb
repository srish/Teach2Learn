class CreateLessonPlans < ActiveRecord::Migration
  def change
    create_table :lesson_plans do |t|
      t.string :title
      t.text :plan
      t.references :user, index: true
      t.references :lesson, index: true

      t.timestamps
    end
  end
end
