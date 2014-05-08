class Lesson < ActiveRecord::Base
	belongs_to :parent_lesson, foreign_key: "parent_lesson_id", class_name: "Lesson"
end
