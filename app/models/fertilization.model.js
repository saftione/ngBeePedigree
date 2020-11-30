module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      name: String,
      shortName: String,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Fertilization = mongoose.model("Fertilization", schema);
  return Fertilization;
};