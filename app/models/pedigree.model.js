
module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      name: String,
      breeder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'breeder'
      },
      fertilization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fertilization'
      },
      fertilizationDate: String,
      properties: String,
      queen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pedigree'
      },
      drone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pedigree'
      },
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

  const Pedigree = mongoose.model("pedigree", schema);
  return Pedigree;
};
