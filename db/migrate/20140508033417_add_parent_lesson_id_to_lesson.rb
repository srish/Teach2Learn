class AddParentLessonIdToLesson < ActiveRecord::Migration
  def change
  	add_column :lessons, :parent_lesson_id, :integer
  	add_index :lessons, :parent_lesson_id
  end
end
