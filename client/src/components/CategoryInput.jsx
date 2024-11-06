import React from "react";

function CategoryInput({ createCategoryHandler, name, setName }) {
  return (
    <form onSubmit={(e) => createCategoryHandler(e)} className="space-y-4">
      <div>
        <input
          type="text"
          className="w-full p-3 rounded-md border border-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-dark bg-secondary text-dark"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter New Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-md bg-dark text-secondary font-semibold hover:bg-secondary hover:text-dark border-2 border-dark transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}

export default CategoryInput;
