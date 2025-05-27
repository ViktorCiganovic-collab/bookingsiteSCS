import React from 'react';
import Itcourses from './ITcertificates';

export default function CategoryButtons() {
  // 1. Extract and deduplicate categories
  const uniqueCategories = [...new Set(Itcourses.map(course => course.category))];

  return (
    <div className="d-flex flex-wrap gap-2 my-4">
      {uniqueCategories.map((category, index) => (
        <button key={index} className="btn btn-outline-primary">
          {category}
        </button>
      ))}
    </div>
  );
}
