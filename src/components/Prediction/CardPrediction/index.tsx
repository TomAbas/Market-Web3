import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import CardPredict from '../Card';
import { Typography, Stack, Container, Grid } from '@mui/material';
const index = () => {
	const listCategory = [
		{
			name: 'All',
			value: 0,
		},
		{
			name: 'Crypto',
			value: 1,
		},
		{
			name: 'Sports',
			value: 2,
		},
		{
			name: 'Economics',
			value: 3,
		},
		{
			name: 'Esport',
			value: 4,
		},
		{
			name: 'Polictics',
			value: 5,
		},
	];
	const listPreCard = [
		{
			value: 'Crypto',
			name: 'Will Bitcoin settle above $17 463,28? ',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/b645/ab96/f6663ab1ba18578e59d3998e04fa0322?Expires=1678060800&Signature=kjwph5ohqTCTGnXMSFh8xwOpRo2v7BixNSZ3zo8nn4rRsSRke7QiP-Fww2W2k4f~-QBrRlUg7H9wS~kk9BeI-JU4q5LgUYo0ez4i5SZ03taO-5fsGSPOMvMXEo0fssrzv292C2nPjPkJgVtXTNhIT34ttVFMv3suMSKwTfLBsUfAQQgZ7j0s0nBMYcliAXl5s3cxCMY6E3VZbCKYHnb2ldpcaFkjbt9-54ZZeuRMp~4dCUL1qsncKWSmy200rwNDtPRwSVrZjmPvzluxEVE-vgEPKGjSz2plLfF9bM~ity4hOFYC43hqAhV0tTyOVc5UiOvLtTkoyEkw9vRxjjeRsg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Crypto',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/7fa9/aa6e/d0e6ceeabe4f96070b9141df64a339b1?Expires=1678060800&Signature=GZw0XJEYBonBCAH3Qup4brkWc8qSwvTdhkXIKe~fyylOvpXCV7WjSB4bmVXMkhfX126I1AgMuslXytTApkaMEVG04xiwk79prOiWFaDfj7L3I21QBVeqgYud0BFxZ72qv~meFB4GOovhwg1MJ0oC-52vLAX~Z1CQ0JSmxih8Ozehg139bBWaMyVmI8S1J4BKiTRGJM5Xkett1XO0EBZ1znHPXE8q9FnklW3Mf-QFYczwEswFsS9deFydous3ShUByB3TWQAPNmNREXGhgxJSUB2s8EhhDXGZOwvDW~EzpwzdY9EkoGTbAojSmLsTWi3vJDxBlhSHNe45HX3i2X96qA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Crypto',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/b283/1514/aa94770fbc15597f81fc707876c63b4a?Expires=1678060800&Signature=Cw0nf-dB5zlVgz8OaWhPbvPoMQpUdErIOUfXa5Ws5uMPx0wZdjDGbM5Rf4Wfx3bHRFTxp12Oicgq6GC9E34pCkeWkCWpengNVhaVPyZXAGgr6gaTt5qgOFy3VOXAjSd67LkP3AG72CFJ29qscDBwwun6o3NLhR0~U4K2batUYSzpqx4KzEOSaRSwS6u4qpQA~i5125o0kKfXMja7Ffc6ctUyimJfgkVDNCzyV1CeT0JyqA~0lVUK3G5lm8OkEU~oMCmccmelb8cmS3z14BnDGi2DIPcv~VW-kNwoCC9rbgUzVHBBtOpnPWhq0BJ9KQnN1K9M-SP80pFaATHqa7rreQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Crypto',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/d38f/921f/bf849afacec1adf5c42934ee225c3b5f?Expires=1678060800&Signature=hnvFXyjhEXdTpKLccrvkFTyLjrw~TZ~73l2XyKXG6v5cxgzgXDpTx8nyE8-nSMci6l-UIgBwn~~XXPupxUMa~lyE88bTl2a1KXxNKbSb9TuF0cQyi5fs8ca6FS4bM~WfiknPb4nw2tSP1IFNeUWJxRX-XkAb5dXsOEDbjKrndDRdSqRLNiO7x5VTTCHGusDc69mDVmC6iZeyg43MUeBLcUKCkVSwUvafoc3kPaR~7Vwi4~gLrxR8Fs2guLu229Pl-dzBvtbNIc9O8Yzc5TZSaV-aFMPOpZFJkJNG~kIUGLDz88RtphpnVZXI-St79qih-BOS0cHLgYg0tDqhqstn4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Sport',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/6afc/dd2e/e00cf3fa35959e2712bd4cdc631058bc?Expires=1678060800&Signature=m7ncHafzJbEeN899mdG-GvHAqMyUqE3Z62YkXc5BnIJv~J4yIdznbu2lgJRaoU6EbMshUJEz6Ejws7cx-qJ1WzrxJFDxDe6Pt9GLw0Pm9c1ymKd4C~IPp-5itImXsrXVDnBJA3LNZHWWO6CNFuwQxMvvvSOj7~50I-iiuSaEpPG0uSSu2StS9YRgJVv8NwsP8~ekoT-7gAW2P6o-ox87Y024hMAx42nN8j05WuOzQnXPdJk9CtM~RTCZgzIESyYUQ~cyh9WxXvmwI7sQX0v9Lj7YgZq8NDgvR1jji6pCWujvpZeeMT2gARnYkgO4O2WCoR47VA8qrEfJ0pRkBrMnxg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Sport',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/55e4/5f93/5b148785016c1157cf42f6cdf760bf5a?Expires=1678060800&Signature=pD~tNv8rNXjr~XmysDxteKHw-FbeV6Eorpr3nx1E6NntUCkTsqdkCpB7igoZQMI14SEV0jPgp6WjSKErBFpnC6YZnxgRm~rbpBIi~4iafFi5LeYBHRDyUQvq0w~8J2Fx03ZBB9mK6swu9TIpIfuzz5g2ecHb5B87eOTMJ9R-b8Px1nKakkZzqtIkk8d0JEF9IX8ZQuUkHhagy9iQS34XoQyLm1NfK9Ib2B9VQK8QTVfb~fgoBz9svbmJhCb3iAX4UY7bu~GveOzRxVhAu1wu6vHzwVlfGEKCr3DuX-yyF61I19RoiAHbB3-M4HYsWWZFBqWUUpy3UABflFzYy7bFDA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Sport',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/48c8/1554/829da0fbd8b728dd11b8c013f7097060?Expires=1678060800&Signature=BnTdazttXbaUGDcS1IYAP44ffRZtcygTCSvvAzzjZcZ-1bn6YBOlxYxBSjTCmp1j18tTC-wg4Abgt8z6Nvbs-w0xpSWaxdL9RmAQZGKO7xzPeivIbJR7GFGUTCZx~Rd4DBnu2NGeSLacfbu8mIeeI1A2lBDTjVcfDrxyhVlzzfBoj59ak~34~EjBBEAlCl3vyquykHiFk7KLzlKnyzQXmgVRpF1L9bJA5ae7rtyITQt7mS7DIZnm3OnQjhiOqdh3iWOLnzWu1~010~wHxBfvo72M19oH4jaXRb2JJstj-Nas9QUnPj9m~goJ7Y2B6GAmOgP9JBL~IGwZfpaqGfN7ZQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Sport',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/e9b7/b694/83150db77f68fc3d32f81ea491155bcf?Expires=1678060800&Signature=Sa3z455~ZEL8NG7W4S9fof4B11fRasrO2UEFbnxABIxLKu7AtQoIqNa4HLNliYe5qYPPK9UlW9tSqauWyx0cdtScVwQTAd9JsxaP0nyCnBVpQWC9myAltkPWGDjTaIgtO~-djvzjZGimv6bBkbur4fO-3a9MH3wxLcorALw446xmBnlhmQjAEXv-zINx1GEIKkhRJK7gQSrBO6cyWpCESYHFgW9bZt2wX-H4rEmLFy5d2X~n8iswuD3WjuLnzv8lDmL92GTL8OTjvEUoRPm6ey3rXq6SH5Uc2ksSw0d1Yj1wJDC~PZoerxBES4V~CZ059SLyjEfYHtZEFxBkOBpMNw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Science & Technology',
			name: 'Comingsoon',
			price: '32',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/1814/57d7/754666c036abc3e0703ef271f850da2d?Expires=1678060800&Signature=ETW~N~g3DT5ZKIFYClijuvj8Why3hWJDlt1vvzXa07MFuDzzxMVXMsQox0JFXGDiZ7BUOJMAUEu8LDZZtEqNJMFBoG0gOZeVjf6WnX5SitRuRahC9NvMLENU5HPCjlKm1Q0V~Zxywh~7Gmq8hKOg~TWetnKQbQ1AHLxWo1YnpXsVErK4hPUTPVY-5NHg0xz25WfVN2MDxmoEriKpOM7bufe~WJfheAA-r8AleofnEZfvpL8UErY~qNO94J5XCx6NDi6oM6S-sdrriarE-PWouZo1~xoUW28lcZNyPS1TDAEpD1Yjl0zE8QijPfwWrfeEyAwX8L-k~ERRylYQtJxI2Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Science & Technology',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/a1d4/a15b/5a43e9ea333976af38dbfe03b648dec1?Expires=1678060800&Signature=NTrUiT9fdRDx0fNUsfERuo3mraqgMmzhkEEAO7sVffb00XHXYDi2qqYs88WLRBoFYbMTIIlYdAF9Ibd~GdaRs-4aZUeKJLsGvf1iVFBYzfTTlJ03UczWPYLbdQ1eJXAP08Wl3BdBv6ahUhlseKDQG9Llnf996hStEx-BejddHovZYIhe6Wo-Zk0wZ3gL4p8Jf6d~UHT60CWKLJA1JBtDMxGXrsVDseeKAtrEYBmr5T4m5zV-IXabaxE6jr5VWIxWWI3J6XF98WmTEP8luoLc7D1xz5dISuxcBZW00dV5s10MB1OiF3pZRmgZ~2dIF~tsIdbRE~Kv4HrRi1UqFdNpFA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Science & Technology',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/7dcc/5fb9/e91c7e28abe09354dfdba943b1022754?Expires=1678060800&Signature=mJ4Xn4ogj7YI-5or5UwtjklJLomCcW~exI0l0AYrrIRg8ryUwh~ihdRur51NJcy-Z1Dlok4-57~RMLYwpgcVP0TGhobdOSfmg18WqwiJVe~R5gsE18fK-8MKn0oN~LTg8At~HtTqmzfZlttFhkeJE7Us5AJB03IrxNk2i~KKpHGsrxeLfu28HtXiUi9bpRCExraPqDr1X92JDo47VmYJ61tMIxaG7kk3UPy55Uf22bFavsujRRq4bL5-bXEK23CV5wHQUb4xsIG8uuIR5eSemJZTwng11XCs4TaKKF5qk4qW-~7xkIg2XtfflRlXimIMoC93iZ~bhmnN~JMFsGDljA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Science & Technology',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/300f/5900/4efe6533120ddb0727c2cfe9d9813994?Expires=1678060800&Signature=Ge2eXmn-7nFu~SjE6C7KV5xQVgFXp8sIdYj07sVFovdn~YWi2s7Rp-S6xwqVQHranmDcqBNhmWTdDmdo5X3uliSIGGWISEH1zNOp7isYwdxHKbTN5UF524vBMOYk71pAuG5Wf9b44SwCLCKCCJVDHEIs16cJzn8pvzmMr~xsoJycI6~SJyodN~EX-WjeFPDLUsVjPTprIJyCBdlZX~lAjQFx16m7mKnLQtRj1A15-bPtrCTxgqh5a6DNBpk4LwK88P1GPRiNcu5cVfkcT74M6VcuHb5m77BvkGcbJCGD8RHNeYCse6nujzZYqagEjUpHs6owgzrglhZKEZ~5whSdNQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Politics',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/66a8/8045/a5828ba24f3dac2e9a32717e65f14a9e?Expires=1678060800&Signature=k~yNtXSGprU8lzXjOee7Ityi7WvH8v9whNl3j7yhJeArt5rZ2if75dtI2eS0qyPIM4gFLuu8FuzTXkKKQmUyz4b-9iN71phE7ENniD-RYErNivjOCEnVT4zgANqW9UF4SRDSC2DZO~C9zrDqqkbX-sdKHBOgwhmAIUpBy-P0nlvRisY-QcRRFrkh5yQ070MP5PVHP4MwlZ68NCoI9OE8gJ68xASs8HTZ1y4tQAFMD1maZfpOcMlA8NhAfkjv8lvMvw-X7z~JpsacX5PhkCfPylyRqymbioSy3lBB~iQ4pc11LGLCUyhCWdX8C3GpbApm7mmw5WYLBIVIfyza2NBQgw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Politics',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/f7a9/0ddd/842f6ee97099e22472246fee67176374?Expires=1678060800&Signature=o0m2~gnkYISc4VI0RAbqbmAPaIS8oueMAL16ZAeTRy7A5lKG9MxV9acdg~PvhaFPgttMSFcZbNC0rGJ5qZ1U313t0CWD8ig2tEIFlkH4ULu5UKTxmGDhFLDXX2snLnwjocyWo54meSCDkqVgSHKU9VZfw9Hcq4DnKDdzyPYpMTki9mB4rWk5TT1bj0stcR71ozwjY5dISagD8XsVl4w4AOqHxBdlDWHBspdj9X8JMoV490M3uVKaLDqvZ3w0fT~4zdOmJE-riu7et12FrSHDdC~E5ba2HIlRvfNPv~y0Ekhn~DeygCN6jLPxvyOdBn-oJ1T0N1sHm-RqDhaRyvZ~1w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Politics',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/b5ae/7a55/238a09104ca305a4d973263beaaced13?Expires=1678060800&Signature=C2NKiLgQPQDeqk-XmT-kBX1mbNrZDiPhd1LGWMq26I4lzGMH4mwgqQsdfYHM37I1IVYDFXtJKTis3Jrjsg9oyxTCvis1bQPeHmEk-ci~1JvbxrJhBcPauX0w5tp~7QfyWTfj1kVnQZufYD1MCIQNRcC0Oih4T-UuLtA97cknZqlLcH0NzBbUAyo4-FuKTjz2FbR2F8COVXBSL43GePkc~5XJXVs4vb3jXF8HDXlMvHVnk-wZCbWbK2HO4kq36JQTYkw4cjMgD7o0ArXJnuSMHaOmPDvufB7S~4noaj3wyz~-0~7L9ow5nL9FEUHCsMr3o84sVlTS~dygXSh6XOvT8Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Politics',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/0a05/d2b0/a31d161304a999fc5d15f60e02bfea75?Expires=1678060800&Signature=JTAcexOpXll0ifnPGorwy7df41CVOyjATzwAs-QAfAefI9RPhtqfizYMicJhr76BBjoUsR1HdZcmHZpHjapiytGWvk3tKlCGnLCE93yA7OkZMYxK1ohIkZuDHm9fTlqpEO9-VAlhoTmq~mNCGaTBkvwvt5ue-9UkliBSIGEa0afBAGGUrt52cAcr2xcLeRr2hOLc6DEtC3wYNjNvNwA5elnL8PVqI4gAZHan8H7xPibc7kZFqLyDrpwwMPQyfgpw3QkPr6ogvytHwcn~xNoeOLLuHXd7j3F1WaQwppkakiGXIR34SV5VvDcIV8muUm3IkmtpZvczmLTnq40~L7CFHg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Esport',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/a7cc/73cf/3bd62e9fe1bfa964b1ce5e6bfddfdd44?Expires=1678060800&Signature=FaFZt2gvl7QjxfI0yBwjCTafuaBkAqAqyBMdW3uZALh91MV88B4OuUuIBkNuGHYLMP~7is2MfWGmnj8iMeXGclWViycxWG37Ta1N70G0ISy2LGurAzDlaBRRqZEL1Bk2gL9jL2h~n3pmkH3Y22grmYDkKQsGjvkpU22u9229hp74iic6sQOBRKQDzYhmqJCRBVPi2-3dEmUCwgn2TbxKt07bdvB1s5IQPPgrf9OenhFdAj~WQYg~VB8nNuuKY6v1YYk0Fq7IQh5D4SU~Tv-ALvAc9Jnl3anJ50A3PiCNjEI2A4mOhxapx~W5F~SqO1TpLCc6i6FlmU752-EeFFslGw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Esport',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/60af/6542/52e2b437c72da1881d85139b6da5cf60?Expires=1678060800&Signature=LJ3x5moL3Z0F-R7PAk95wXsc6dlAbtp4d5BmIbk0hjZwv~j~XyOUWsDJGyjspfSkKsF4ugIUFwajr08GvV7iB4zs8FnERKEHjAaGVpL3HvHUGeqAXiwaY8bmcGGi9nDYXQAiV0VkoDW3bcTmdqRg6f4oljdpzUG02tXf0-KAnIX7ArG8NFs50d3QIhR7oAcR5sBYYSXo9Bcj-pmiOO8hQuNNoDUKMrWusLbWDKtR0XRbdVLcCfm~xQzATmj90nlhg-J4zDfgha6e1s1CIYRUqDXvV~W9YG5oT3~TWQn9VInnzhp1d7Ma4OQqKTtXacGAVWsgQKYtEqVgIwO-xGmB7A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Esport',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/b5a5/e44d/2fb2a8ebfe41011cd4f5726284572ae3?Expires=1678060800&Signature=WxMF5HfX3f0KIDXs2dE1KdzRIyIw1~fXssdg1Y0zDujPNHLTJ1PiPugH3eP06UZ3VWK2ECqbW-SK1WsrVoYBZIz1uqOK~cOOy0TpltzJa4iigR-4FNPei2YlCmc8ToOTMMY-295705j0resIotqtjAdX4OnrZDwUoJFQNRQrliRCoiC0TneljrwgUjj8DmsMldH~Q9ebBw8gAVOLzIKOlhdXy7HC6JS0v0LrAbw87hY~S63slVAccBnWUqy01KIScP0y4MRJ20JGBXwBm7YHc4FZvtyp0DHn~B15-u4CGLehCwBIIUOPEbwK5WaZhf6qz~kxlEYVz30F5A8nvuPsLQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Esport',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/c3c7/b8d4/95cc669202ffe3df4faea11cebc88dcf?Expires=1678060800&Signature=p7ZPHk9IMOrBbEcJ--29urk-NxhJUGzvTs94I-T4vdIEBPj0VoCroERKIxTytFcvccQKAl1LbAVfzGTpnYur-4vC5Os2eD0C71OHpT6cz4WZxeVjiNwZLP-yQXqAQFFSoAcD75BWLAo-ZIxvqYY8giZZNgWnrJAf~0lUgfZk7s~sCw02onZnokz1Op-FlsWfLu2Q5U4u3NNp-RleZca7Y0Oe4FOtGag5c0JqTgIKA5KNH4l5bj1UaC18T0W3O5oXV7EAiQudSHriNjia8rpmYZUd4PbcK9OfUNd~Ep4ZCzOH8oFkjT~MsDnBSVx5er53dqQgxcqdS-xIJUsX9kzTPQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Economics',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/cee1/ec69/55cb61e705791b04ca29b0782bd7a8d9?Expires=1678060800&Signature=QrV9GmELcqLFRWx6tdjdvESp282d4nGI9fNpe9iar8Xc3~WOzr0ghKhqkNOe~7W7AXhwLIEMVoSiTrcjwzRSmwi~ed6ljS4TfF3hn~gtfoPBkL~-ECKXB8GxJ-uYlm8V5xVdsuhhvvENvELTHN5-SjPpG3Aow~k2PwlFietsa2~w0K2GGg2AKUH7gOmC6Z5s5HCvmSmeQ9m7olUiWhbpMbYGTRReEUonWKQOO6Khsa4rGFj3aCHL9jhmtdhk-kM0l4aNZKc7oQG7gGVRdH5eQ9xNNVT4~DLk32Lq12rdPdgMJC-K8xVmEFEem7di02hN84-NmLjpP9rF3XjnzJQW9A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Economics',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/31e8/13ff/b52756968452ee750a0b43d1dfac59f2?Expires=1678060800&Signature=hZteAcOh0x~JRGEYy-yadfS1PzgOVzVWQKScdkOKdW2DMhI5bPj45gNj1NJ~qbc8jjO-wEcmFskHgWkFqslccQq0SXzZBmX60XsDEVIN0WEP40BraSEGQ1gjN6wQgfcD~grtocH4LIALJCiL-GcjiD2tGlumFaR3uYG38UgS5eGy6WJvGAtJ7noZ8PrYSM3x2aRkjxlps25nYiERtbI~hCZmKRy5GEcT5TUba4XYE48a-dp00oZZ2Dno4PZIf2RhehdnGML7ZsBh6oRyRVTDl76ksigTb~2VZvQeDemSlunrE~webS0ZFNvQ-a32boYY4xTyUzsPjqgyjZSxKCU04w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Economics',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/fae0/f5a8/30595c12353d13f812aeedf59b095b91?Expires=1678060800&Signature=Bc~nx6Hz~OR8~fj1ALv05BpRTW3WThVX8294XK31tJ-naSMTKett-fXS0r9wphypJ3zUGHW~4GF1vkjF6DZOgs8HQyn7FBIMOvCNO~94r94sEiFb3Oe7hOK3u9VBZamqBVdKOLC0hmRwNVSrRnh78PS1EySh1yDrqJ4LU5iTwCDmakidtg9TinZpBkU6ilKBb0LT4ibkpDhkDjrHM~IizPrC3gceVHvGx5BgjjsbsPGJJASgsUcY7dxIyxcoXaTOyqz7Ov3GeSYkd5czRfQ2~HPpx8loDPLEw2ymqQbOSiw-uqcmWH4rhYdiBYkZdhn79uM1j16OxvsAKwRfOGIyAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
		{
			value: 'Economics',
			name: 'Comingsoon',
			price: '323',
			endTime: 'END TIME: JAN 11, 2023 4:56 PM (PDT)',
			URL: 'https://s3-alpha-sig.figma.com/img/b0ba/f1d4/856e5a7c7bd872475d76162cc322566a?Expires=1678060800&Signature=f0TxkByKa8xzucCV66l~4GXUWjeAMjY0Dv8ZHU6G4lcGRGj7WdbYNA0QZq2X2j~IbK7KBvRlUFnD9xRPoYDYlWjpk7UgXPF6L0ek6kx22oLAnHLofCMs9bXToC157NTvf3MUh0TyaMA0HbWSurRarKYtqp~xB1x57yUcrZ2nYwtwEwLq~9IPpb1E1AnoWQ7H4gDMs8A-MBBh2FbkWXyVTWynrXJO~Ewwd75dSIjMKDjRGWnz6KLef8CDM03w2vqbRoekuqnGA6m5T1SIQsZD-MBgVjdnbImmlK0DIJ00CCDHTUUFb6xbO~pqM6F0kp9eaxtPuU3jzP7UN8ftBi9PPA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
			decription: 'What does the market think?',
		},
	];
	return (
		<Container
			maxWidth={'xl'}
			sx={{
				background: 'linear-gradient(180deg, #E0F4FF 0%, #FFFFFF 100%)',
				minHeight: '100vh',
				paddingTop: 20,
			}}
		>
			<Typography align="center" sx={{ color: '#131740', fontSize: '5rem' }}>
				Prediction
			</Typography>
			<Stack direction="row" justifyContent="space-between">
				<Stack
					direction="row"
					justifyContent="left"
					spacing={'50px'}
					sx={{ mx: 'auto', marginLeft: 1 }}
				>
					{listCategory.map((item, index) => {
						return (
							<Stack
								direction={'row'}
								sx={{
									width: 'fit content',
									background: '#FFFFFF',
									textAlign: 'center',
									border: '1.5px solid #e7e8ec',
									padding: '10px 30px',
									borderRadius: 3,
									cursor: 'pointer',
									'&:hover': {
										color: '#FFFFFF',
										background: '#1976d2',
									},
								}}
								key={index}
							>
								{item.name}
							</Stack>
						);
					})}
				</Stack>
				<Stack
					gap={'8px'}
					direction={'row'}
					alignItems={'center'}
					sx={{
						width: 'fit content',
						background: '#FFFFFF',
						textAlign: 'center',
						border: '1.5px solid #e7e8ec',
						padding: '10px 30px',
						borderRadius: 3,
						cursor: 'pointer',
						'&:hover': {
							color: '#FFFFFF',
							background: '#1976d2',
						},
						marginRight: 1,
					}}
				>
					Create
					<AddIcon></AddIcon>
				</Stack>
			</Stack>
			<hr style={{ width: '98.5%', border: '1.5px solid #e7e8ec' }} />
			<Grid container>
				{listPreCard.map((item, index) => {
					return <CardPredict data={item} key={index} />;
				})}
			</Grid>
		</Container>
	);
};
export default index;
