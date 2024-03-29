export const checkedProduct = (data, products) => {
  const id = +data.id
  const newProducts = products.slice(0);
  let product = newProducts.find(item => +item.id === id)

  if (data.checkedElem) {
    product['checked'] = data.checkedElem
  } else if (product['checked'] && !data.checkedElem) {
    product['checked'] = !product['checked']
  } else {
    product['checked'] = true
  }

  return [newProducts, product]
}

export const changeItemArray = (oldArray, id, product) => {
  if (product['checked']) {
    const newSelectedProduct = {
      product_id: product.id,
      units_id: product.units_id,
      quantity: product.default_weight,
    }
    return [...oldArray, newSelectedProduct];
  }

  if (!product['checked']) {
    return oldArray.filter(obj => +obj.product_id !== +id)
  }
}
