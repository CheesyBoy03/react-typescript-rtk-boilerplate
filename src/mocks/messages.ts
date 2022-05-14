export const errors = {
  notFound(name: string, id: number) {
    return `${name} with id ${id} was not found`;
  },
};
