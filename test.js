// setTimeout(() => {
// 	console.log('Hello, World 1!')
// }, 1000)

// console.log('Hello, World 2')

const myFunc = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Hello, World 1')
		}, 3000)
	})
}

const myFunc2 = async () => {
	setTimeout(() => {
			return 'Hello, World!!!'
		}, 3000)
}

// let result = myFunc2()
// console.log(result)



// myFunc()
// 	.then((result) => {
// 		console.log(result)
// 		console.log('Hello, World 2!')
// 	})
// 	.catch((err) => {
// 		console.log(err)
// 	})

const getResult = async() => {
	let result = await myFunc()
	console.log(result)
	console.log('Hello World 2')
}

getResult()