setPageTitle('听点音乐');
let d = [];
if (MY_PAGE == 1) {
	d.push({
		col_type: 'pic_1_full',
		title: '0',
		img: "hiker://files/zf2629/svg/logo.png",
		url: 'hiker://localMedia',
	}, {
		title: '‘‘’’<big><font color="#1AB16B">听点音乐</font></big><small><small> 歌单</small></small>',
		col_type: 'text_1',
		pic: 'hiker://files/zf2629/svg/QQ音乐.svg',
		url: $('#noLoading#').lazyRule(() => {
			if (!fileExist('hiker://files/zf2629/json/gedan.json')) {
				saveFile('hiker://files/zf2629/json/gedan.json', '[{"title":"热搜歌曲","icon":"http://qpic.y.qq.com/music_cover/hKFribMhwH4ClwNWJxicuCxjuwIkbZPq4HVT0Qgxsdb8JWQXXC2TFsuQ/600?n=1","id":7532670538},{"title":"抖音热门","icon":"http://qpic.y.qq.com/music_cover/WpvdJXfn798ibD4gcfjw0NSuBkFTJYpY5QOev3ExcBQiamRcobkpN77g/600?n=1","id":7630303474}]');
			}
			let gedan = JSON.parse(request('hiker://files/zf2629/json/gedan.json'));
			return $(gedan, 2, '小七歌单').select((gedan) => {
				let a = gedan.findIndex(t => t.title == input);
				var id = gedan[a].id;
				return $('hiker://empty#immersiveTheme##noHistory##noRecordHistory#').rule((id) => {
					setPageTitle('小七歌单');
					let d = [];

					function sign(params) {
						function middle(ls) {
							let resNum = [];

							function test(a, b, c) {
								let r25 = a >> 2;
								if (b !== undefined && c !== undefined) {
									let r26 = a & 3;
									let r26_2 = r26 << 4;
									let r26_3 = b >> 4;
									let r26_4 = r26_2 | r26_3;
									let r27 = b & 15;
									let r27_2 = r27 << 2;
									let r27_3 = r27_2 | (c >> 6);
									let r28 = c & 63;
									resNum.push(r25);
									resNum.push(r26_4);
									resNum.push(r27_3);
									resNum.push(r28);
								} else {
									let r10 = a >> 2;
									let r11 = a & 3;
									let r11_2 = r11 << 4;
									resNum.push(r10);
									resNum.push(r11_2);
								}
							}
							for (let i = 0; i < ls.length; i += 3) {
								if (ls[i] !== undefined && ls[i + 1] !== undefined && ls[i + 2] !== undefined) {
									test(ls[i], ls[i + 1], ls[i + 2])
								} else {
									test(ls[i], undefined, undefined)
								}
							}
							let res = [];
							resNum.forEach((item) => {
								let zd = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
								res.push(zd[item])
							});
							res = res.join('');
							return res;
						}

						function head(md5Str) {
							let res = [];
							[21, 4, 9, 26, 16, 20, 27, 30].map(x => {
								res.push(md5Str[x]);
							});
							return res.join('');
						}

						function tail(md5Str) {
							let res = [];
							[18, 11, 3, 2, 1, 7, 6, 25].map(x => {
								res.push(md5Str[x]);
							});
							return res.join('');
						}

						function getLs(md5Str) {
							let zd = {
								"0": 0,
								"1": 1,
								"2": 2,
								"3": 3,
								"4": 4,
								"5": 5,
								"6": 6,
								"7": 7,
								"8": 8,
								"9": 9,
								"A": 10,
								"B": 11,
								"C": 12,
								"D": 13,
								"E": 14,
								"F": 15
							};
							let ol = [212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6];
							let res = [];
							let j = 0;
							for (let i = 0; i < md5Str.length; i += 2) {
								let one = zd[md5Str[i]];
								let two = zd[md5Str[i + 1]];
								let r = one * 16 ^ two;
								res.push(r ^ ol[j]);
								j += 1;
							}
							return res;
						}
						let md5Str = md5(params).toUpperCase();
						let h = head(md5Str);
						let e = tail(md5Str);
						let ls = getLs(md5Str);
						let m = middle(ls);
						let res = ('zzb' + h + m + e).toLowerCase();
						let r = RegExp(/[\\/+]/g);
						res = res.replace(r, '');
						return res;
					}
					let body = JSON.stringify({
						"req_1": {
							"module": "music.srfDissInfo.aiDissInfo",
							"method": "uniform_get_Dissinfo",
							"param": {
								"disstid": Number(id),
								"userinfo": 1,
								"tag": 1,
								"orderlist": 1,
								"song_begin": 0,
								"song_num": 1000,
								"onlysonglist": 0,
								"enc_host_uin": ""
							}
						}
					});
					let js = JSON.parse(post(buildUrl('https://u.y.qq.com/cgi-bin/musics.fcg', {
						_: Date.now(),
						sign: sign(body)
					}), {
						body: body
					})).req_1.data;
					let json = js.songlist.map(j => {
						return {
							title: j.title,
							singer: j.singer[0].name,
							album: j.album.name,
							pic: "https://y.gtimg.cn/music/photo_new/T002R500x500M000" + j.album.mid + ".jpg",
							id: j.mid
						};
					});
					d.push({
						title: js.dirinfo.title,
						col_type: 'movie_1_vertical_pic_blur',
						desc: '🧸\t' + js.dirinfo.host_nick + '\n\n🎼\t' + js.dirinfo.songnum + '首',
						pic: js.dirinfo.picurl,
						url: $('', '曲名或歌手').input((json) => {
							function search(array, name) {
								return array.filter(item => {
									return item.title.toLowerCase().includes(name.toLowerCase()) || item.singer.toLowerCase().includes(name.toLowerCase())
								})
							}
							let results = search(json, input);
							if (results.length > 0) {
								return $('hiker://empty').rule((results) => {
									setPageTitle('搜索结果');
									let d = [];
									results.forEach(j => {
										d.push({
											title: j.title,
											col_type: 'text_1',
											desc: j.album ? j.singer + ' -- ' + j.album : j.singer + ' -- ' + j.title,
											pic: j.pic,
											url: $('#noLoading#').lazyRule((j) => {
												try {
													let js = JSON.parse(fetch('https://zj.v.api.aa1.cn/api/qqmusic/demo.php?type=1&p=1&n=1&q=' + j.title + ' ' + j.singer)).list.map(d => {
														let url = d.url.replace('t=3', 't=1');
														return url;
													});
													var url = [js + '#isMusic=true#'];

													function sign(params) {
														function middle(ls) {
															let resNum = [];

															function test(a, b, c) {
																let r25 = a >> 2;
																if (b !== undefined && c !== undefined) {
																	let r26 = a & 3;
																	let r26_2 = r26 << 4;
																	let r26_3 = b >> 4;
																	let r26_4 = r26_2 | r26_3;
																	let r27 = b & 15;
																	let r27_2 = r27 << 2;
																	let r27_3 = r27_2 | (c >> 6);
																	let r28 = c & 63;
																	resNum.push(r25);
																	resNum.push(r26_4);
																	resNum.push(r27_3);
																	resNum.push(r28);
																} else {
																	let r10 = a >> 2;
																	let r11 = a & 3;
																	let r11_2 = r11 << 4;
																	resNum.push(r10);
																	resNum.push(r11_2);
																}
															}
															for (let i = 0; i < ls.length; i += 3) {
																if (ls[i] !== undefined && ls[i + 1] !== undefined && ls[i + 2] !== undefined) {
																	test(ls[i], ls[i + 1], ls[i + 2]);
																} else {
																	test(ls[i], undefined, undefined);
																}
															}
															let res = [];
															resNum.forEach((item) => {
																let zd = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
																res.push(zd[item]);
															});
															res = res.join('');
															return res;
														}

														function head(md5Str) {
															let res = [];
															[21, 4, 9, 26, 16, 20, 27, 30].map(x => {
																res.push(md5Str[x]);
															});
															return res.join('');
														}

														function tail(md5Str) {
															let res = [];
															[18, 11, 3, 2, 1, 7, 6, 25].map(x => {
																res.push(md5Str[x]);
															});
															return res.join('');
														}

														function getLs(md5Str) {
															let zd = {
																"0": 0,
																"1": 1,
																"2": 2,
																"3": 3,
																"4": 4,
																"5": 5,
																"6": 6,
																"7": 7,
																"8": 8,
																"9": 9,
																"A": 10,
																"B": 11,
																"C": 12,
																"D": 13,
																"E": 14,
																"F": 15
															};
															let ol = [212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6];
															let res = [];
															let j = 0;
															for (let i = 0; i < md5Str.length; i += 2) {
																let one = zd[md5Str[i]];
																let two = zd[md5Str[i + 1]];
																let r = one * 16 ^ two;
																res.push(r ^ ol[j]);
																j += 1;
															}
															return res;
														}
														let md5Str = md5(params).toUpperCase();
														let h = head(md5Str);
														let e = tail(md5Str);
														let ls = getLs(md5Str);
														let m = middle(ls);
														let res = ('zzb' + h + m + e).toLowerCase();
														let r = RegExp(/[\\/+]/g);
														res = res.replace(r, '');
														return res;
													}
													let body = JSON.stringify({
														"comm": {
															"cv": 4747474,
															"ct": 24,
															"format": "json",
															"inCharset": "utf-8",
															"outCharset": "utf-8",
															"notice": 0,
															"platform": "yqq.json",
															"needNewCode": 1,
															"uin": 0,
															"g_tk_new_20200303": 5381,
															"g_tk": 5381
														},
														"req_1": {
															"module": "music.musichallSong.PlayLyricInfo",
															"method": "GetPlayLyricInfo",
															"param": {
																"songMID": j.id
															}
														}
													});
													let lyric = JSON.parse(post(buildUrl('https://u.y.qq.com/cgi-bin/musics.fcg', {
														_: Date.now(),
														sign: sign(body)
													}), {
														body: body
													})).req_1.data.lyric;
													var lrc = base64Decode(lyric);
												} catch {
													var json = JSON.parse(fetch('https://xiaoapi.cn/API/mv_sq.php?n=1&msg=' + j.title, {
														timeout: 2000
													})).url;
													var url = [json[3] || json[2] || json[1] || json[0]];
												}
												return JSON.stringify({
													urls: url,
													lyric: lrc
												})
											}, j),
											extra: {
												inheritTitle: false
											}
										});
									});
									setResult(d);
								}, results)
							} else {
								return 'toast://没有找到'
							}
						}, json),
						extra: {
							longClick: [{
								title: '📠复制图片链接',
								js: $.toString((js) => {
									return 'copy://' + js.dirinfo.picurl;
								}, js)
							}],
							gradient: true
						}
					});
					json.map(j => {
						d.push({
							title: j.title,
							col_type: 'text_1',
							desc: j.album ? j.singer + ' -- ' + j.album : j.singer + ' -- ' + j.title,
							pic_url: j.pic + '@Referer=',
							url: $('#noLoading##noHistory##noRecordHistory#').lazyRule((j) => {
								try {
									let js = JSON.parse(fetch('https://zj.v.api.aa1.cn/api/qqmusic/demo.php?type=1&p=1&n=1&q=' + j.title + ' ' + j.singer)).list.map(d => {
										let url = d.url.replace('t=3', 't=1');
										return url;
									});
									var url = [js + '#isMusic=true#'];

									function sign(params) {
										function middle(ls) {
											let resNum = [];

											function test(a, b, c) {
												let r25 = a >> 2;
												if (b !== undefined && c !== undefined) {
													let r26 = a & 3;
													let r26_2 = r26 << 4;
													let r26_3 = b >> 4;
													let r26_4 = r26_2 | r26_3;
													let r27 = b & 15;
													let r27_2 = r27 << 2;
													let r27_3 = r27_2 | (c >> 6);
													let r28 = c & 63;
													resNum.push(r25);
													resNum.push(r26_4);
													resNum.push(r27_3);
													resNum.push(r28);
												} else {
													let r10 = a >> 2;
													let r11 = a & 3;
													let r11_2 = r11 << 4;
													resNum.push(r10);
													resNum.push(r11_2);
												}
											}
											for (let i = 0; i < ls.length; i += 3) {
												if (ls[i] !== undefined && ls[i + 1] !== undefined && ls[i + 2] !== undefined) {
													test(ls[i], ls[i + 1], ls[i + 2]);
												} else {
													test(ls[i], undefined, undefined);
												}
											}
											let res = [];
											resNum.forEach((item) => {
												let zd = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
												res.push(zd[item]);
											});
											res = res.join('');
											return res;
										}

										function head(md5Str) {
											let res = [];
											[21, 4, 9, 26, 16, 20, 27, 30].map(x => {
												res.push(md5Str[x]);
											});
											return res.join('');
										}

										function tail(md5Str) {
											let res = [];
											[18, 11, 3, 2, 1, 7, 6, 25].map(x => {
												res.push(md5Str[x]);
											});
											return res.join('');
										}

										function getLs(md5Str) {
											let zd = {
												"0": 0,
												"1": 1,
												"2": 2,
												"3": 3,
												"4": 4,
												"5": 5,
												"6": 6,
												"7": 7,
												"8": 8,
												"9": 9,
												"A": 10,
												"B": 11,
												"C": 12,
												"D": 13,
												"E": 14,
												"F": 15
											};
											let ol = [212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6];
											let res = [];
											let j = 0;
											for (let i = 0; i < md5Str.length; i += 2) {
												let one = zd[md5Str[i]];
												let two = zd[md5Str[i + 1]];
												let r = one * 16 ^ two;
												res.push(r ^ ol[j]);
												j += 1;
											}
											return res;
										}
										let md5Str = md5(params).toUpperCase();
										let h = head(md5Str);
										let e = tail(md5Str);
										let ls = getLs(md5Str);
										let m = middle(ls);
										let res = ('zzb' + h + m + e).toLowerCase();
										let r = RegExp(/[\\/+]/g);
										res = res.replace(r, '');
										return res;
									}
									let body = JSON.stringify({
										"comm": {
											"cv": 4747474,
											"ct": 24,
											"format": "json",
											"inCharset": "utf-8",
											"outCharset": "utf-8",
											"notice": 0,
											"platform": "yqq.json",
											"needNewCode": 1,
											"uin": 0,
											"g_tk_new_20200303": 5381,
											"g_tk": 5381
										},
										"req_1": {
											"module": "music.musichallSong.PlayLyricInfo",
											"method": "GetPlayLyricInfo",
											"param": {
												"songMID": j.id
											}
										}
									});
									let lyric = JSON.parse(post(buildUrl('https://u.y.qq.com/cgi-bin/musics.fcg', {
										_: Date.now(),
										sign: sign(body)
									}), {
										body: body
									})).req_1.data.lyric;
									var lrc = base64Decode(lyric);
								} catch (e) {
									var json = JSON.parse(fetch('https://xiaoapi.cn/API/mv_sq.php?n=1&msg=' + j.title, {
										timeout: 2000
									})).url;
									var url = [json[3] || json[2] || json[1] || json[0]];
								}
								return JSON.stringify({
									urls: url,
									lyric: lrc
								})
							}, j),
							extra: {
								inheritTitle: false,
								longClick: [{
									title: '下载歌曲',
									js: $.toString((j) => {
										let url = JSON.parse(fetch('https://zj.v.api.aa1.cn/api/qqmusic/demo.php?type=1&p=1&n=1&q=' + j.title + ' ' + j.singer)).list.map(d => {
											let url = d.url.replace('t=3', 't=1');
											return url;
										});
										return 'download://' + url
									}, j)
								}, {
									title: '观看MV',
									js: $.toString((j) => {
										try {
											var json = JSON.parse(fetch('https://xiaoapi.cn/API/mv_sq.php?n=1&msg=' + j.title, {
												timeout: 2000
											})).url;
											var url = [json[3] || json[2] || json[1] || json[0]];
										} catch (e) {
											var url = [JSON.parse(fetch('https://api.cenguigui.cn/api/juhe/api.php?type=kgmv&n=1&msg=' + j.title, {
												timeout: 2000
											})).data.url];
										}
										return JSON.stringify({
											urls: url,
										})
									}, j)
								}],
							}
						});
					});
					setResult(d);
				}, id)
			}, gedan)
		}),
		extra: {
			lineVisible: false,
			longClick: [{
				title: '💞 获取歌单',
				js: $.toString(() => {
					return $('', '❗️歌单如果有新增，则需要重新获取\n\nQQ账号获取歌单').input(() => {
						let json = JSON.parse(fetch('https://api.cenguigui.cn/api/music/qq/user_list.php?qq=' + input)).myplaylist.map(j => {
							return {
								title: j.name,
								icon: j.pic,
								id: j.id
							};
						});
						gedan = JSON.parse(request('hiker://files/zf2629/json/gedan.json'));
						gedan = gedan.concat(json);
						saveFile('hiker://files/zf2629/json/gedan.json', JSON.stringify(gedan));
						refreshPage(false);
						return 'toast://已添加'
					})
				})
			}, {
				title: '🔰 歌单管理',
				js: $.toString(() => {
					return $('hiker://empty#noHistory##noRecordHistory#').rule(() => {
						setPageTitle('歌单管理');
						let d = [];
						d.push({
							title: '提取id',
							col_type: 'input',
							desc: '请输入分享后复制的链接',
							url: $.toString(() => {
								if (!input) return "toast://不能为空";
								let txt = input;
								let u1 = txt.split('&')[4];
								let id = u1.split('=');
								refreshPage(false);
								copy(id[1]);
								return 'toast://已复制' + id[1];
							})
						});
						d.push({
							title: '添加',
							col_type: 'input',
							desc: '显示名称@图片链接@QQ音乐id',
							url: $.toString(() => {
								if (!input) return "toast://请根据提示输入内容";
								let gedan = JSON.parse(request('hiker://files/zf2629/json/gedan.json'));
								let n = input.split('@');
								data = {
									title: n[0],
									icon: n[1],
									id: n[2]
								};
								gedan = gedan.concat(data);
								saveFile('hiker://files/zf2629/json/gedan.json', JSON.stringify(gedan));
								refreshPage(false);
								return 'toast://已添加'
							}),
							extra: {
								type: 'textarea',
								height: 2
							}
						});
						d.push({
							title: '歌单图片链接可以在歌单二级海报长按复制，所以可以先添加歌单再编辑添加歌单图片，或者自己选一张图作为封面。',
							col_type: 'scroll_button',
							url: 'hiker://empty',
						});
						let gedan = JSON.parse(request('hiker://files/zf2629/json/gedan.json'));
						var index = 0;
						gedan.map(j => {
							var item = j.title + '@' + j.icon + '@' + j.id;
							d.push({
								title: index + '.' + j.title,
								col_type: 'card_pic_3',
								pic: j.icon,
								url: $(['编辑', '移位', '删除'], 3, '请选择').select((index, item) => {
									if (input == '编辑') {
										return $(item, '想要更换的歌单名,歌单id,图片链接 ').input((index) => {
											let gedan = JSON.parse(request('hiker://files/zf2629/json/gedan.json'));
											let n = input.split('@');
											gedan[index] = {
												title: n[0],
												icon: n[1],
												id: n[2]
											};
											saveFile('hiker://files/zf2629/json/gedan.json', JSON.stringify(gedan));
											refreshPage(false);
											return 'toast://更改成功~'
										}, index)
									} else if (input == '移位') {
										return $('', '要移动到哪个序号前面/后面').input((index) => {
											let gedan = JSON.parse(request('hiker://files/zf2629/json/gedan.json'));
											let temp = gedan[index];
											gedan.splice(input, 0, temp);
											if (input < index) {
												gedan.splice(index + 1, 1);
											} else {
												gedan.splice(index, 1);
											}
											saveFile('hiker://files/zf2629/json/gedan.json', JSON.stringify(gedan));
											refreshPage(false);
											return 'toast://移位成功~'
										}, index)
									} else {
										let gedan = JSON.parse(request('hiker://files/zf2629/json/gedan.json'));
										gedan.splice(index, 1);
										saveFile('hiker://files/zf2629/json/gedan.json', JSON.stringify(gedan));
										refreshPage(false);
										return 'toast://删除成功~'
									}
								}, index, item),
							});
							index++;
						});
						setResult(d);
					})
				})
			}, {
				title: '♻️ 恢复默认',
				js: $.toString(() => {
					deleteFile('hiker://files/zf2629/json/gedan.json');
					refreshPage(false);
					return 'toast://已恢复默认'
				})
			}],
		}
	}, {
		title: '‘‘’’小七<small> 榜单</small>',
		col_type: 'icon_3_round_fill',
		pic: 'hiker://files/zf2629/svg/QQ音乐.svg',
		url: $('#noLoading#').lazyRule(() => {
			let gedan = [{
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000000isiYt2bk23d.jpg",
				"id": 62,
				"title": "飙升榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000002NKUzR0Ith6j.jpg",
				"id": 26,
				"title": "热歌榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M00000149Dvd2d6DfL.jpg",
				"id": 27,
				"title": "新歌榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000000Ti7sL1AFTKQ.jpg",
				"id": 4,
				"title": "流行指数榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000002DJIiN1mfijA.jpg",
				"id": 52,
				"title": "腾讯音乐人原创榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000000zgJmB43s7X8.jpg",
				"id": 67,
				"title": "听歌识曲榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000001KZ9Zf2So7e5.jpg",
				"id": 5,
				"title": "内地榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M0000003ACkm3rqv4V.jpg",
				"id": 59,
				"title": "香港地区榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000003qhObX39najp.jpg",
				"id": 61,
				"title": "台湾地区榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000004LMZsZ1XAIZr.jpg",
				"id": 3,
				"title": "欧美榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M0000034A67K3EFxL3.jpg",
				"id": 16,
				"title": "韩国榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000002YYfde0ZADJE.jpg",
				"id": 17,
				"title": "日本榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000001hy5US2wmGlm.jpg",
				"id": 126,
				"title": "JOOX本地热播榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000003VbICU29HbXK.jpg",
				"id": 130,
				"title": "香港TVB劲歌金榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000004EjFIr0ORMlS.jpg",
				"id": 127,
				"title": "台湾KKBOX榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000001vIMch2XgZPL.jpg",
				"id": 58,
				"title": "说唱榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000002FZMUO21NEnA.jpg",
				"id": 57,
				"title": "电音榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000004X70Bw0w7X7n.jpg",
				"id": 73,
				"title": "游戏音乐榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000003hkN000eZjNd.jpg",
				"id": 72,
				"title": "动漫音乐榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000000NFmiO3WT49h.jpg",
				"id": 29,
				"title": "影视金曲榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M0000031PLWI1hbIrn.jpg",
				"id": 64,
				"title": "综艺新歌榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000000Yz53P3abCec.jpg",
				"id": 65,
				"title": "国风热歌榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000001bIxT20IBmmo.jpg",
				"id": 36,
				"title": "K歌金曲榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M0000009dYLo45zTmb.jpg",
				"id": 60,
				"title": "抖音热歌榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000000Iytc60OxlUB.jpg",
				"id": 63,
				"title": "DJ舞曲榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000003pDZyw4Tps85.jpg",
				"id": 28,
				"title": "网络歌曲榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000001DNnxU2sOjlF.jpg",
				"id": 108,
				"title": "美国公告牌榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M0000028RQ8W0gld8V.jpg",
				"id": 129,
				"title": "韩国Melon榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M0000012TQwT11JzRk.jpg",
				"id": 107,
				"title": "英国UK榜"
			}, {
				"icon": "http://y.gtimg.cn/music/photo_new/T003R500x500M000000exKym1WRimv.jpg",
				"id": 105,
				"title": "日本公信榜"
			}];
			return $(gedan, 2, '小七排行榜').select((gedan) => {
				let a = gedan.findIndex(t => t.title == input);
				let id = gedan[a].id;
				return $('hiker://empty#fypage#immersiveTheme##noHistory##noRecordHistory#').rule((id) => {
					let d = [];
					setPageTitle('小七榜单');

					function sign(params) {
						function middle(ls) {
							let resNum = [];

							function test(a, b, c) {
								let r25 = a >> 2;
								if (b !== undefined && c !== undefined) {
									let r26 = a & 3;
									let r26_2 = r26 << 4;
									let r26_3 = b >> 4;
									let r26_4 = r26_2 | r26_3;
									let r27 = b & 15;
									let r27_2 = r27 << 2;
									let r27_3 = r27_2 | (c >> 6);
									let r28 = c & 63;
									resNum.push(r25);
									resNum.push(r26_4);
									resNum.push(r27_3);
									resNum.push(r28);
								} else {
									let r10 = a >> 2;
									let r11 = a & 3;
									let r11_2 = r11 << 4;
									resNum.push(r10);
									resNum.push(r11_2);
								}
							}
							for (let i = 0; i < ls.length; i += 3) {
								if (ls[i] !== undefined && ls[i + 1] !== undefined && ls[i + 2] !== undefined) {
									test(ls[i], ls[i + 1], ls[i + 2]);
								} else {
									test(ls[i], undefined, undefined);
								}
							}
							let res = [];
							resNum.forEach((item) => {
								let zd = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
								res.push(zd[item]);
							});
							res = res.join('');
							return res;
						}

						function head(md5Str) {
							let res = [];
							[21, 4, 9, 26, 16, 20, 27, 30].map(x => {
								res.push(md5Str[x]);
							});
							return res.join('');
						}

						function tail(md5Str) {
							let res = [];
							[18, 11, 3, 2, 1, 7, 6, 25].map(x => {
								res.push(md5Str[x]);
							});
							return res.join('');
						}

						function getLs(md5Str) {
							let zd = {
								"0": 0,
								"1": 1,
								"2": 2,
								"3": 3,
								"4": 4,
								"5": 5,
								"6": 6,
								"7": 7,
								"8": 8,
								"9": 9,
								"A": 10,
								"B": 11,
								"C": 12,
								"D": 13,
								"E": 14,
								"F": 15
							}
							let ol = [212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6];
							let res = [];
							let j = 0;
							for (let i = 0; i < md5Str.length; i += 2) {
								let one = zd[md5Str[i]];
								let two = zd[md5Str[i + 1]];
								let r = one * 16 ^ two;
								res.push(r ^ ol[j]);
								j += 1;
							}
							return res;
						}
						let md5Str = md5(params).toUpperCase();
						let h = head(md5Str);
						let e = tail(md5Str);
						let ls = getLs(md5Str);
						let m = middle(ls);
						let res = ('zzb' + h + m + e).toLowerCase();
						let r = RegExp(/[\\/+]/g);
						res = res.replace(r, '');
						return res;
					}
					let body = JSON.stringify({
						"req_1": {
							module: "musicToplist.ToplistInfoServer",
							method: "GetDetail",
							param: {
								"topId": id,
								"offset": (MY_PAGE - 1) * 60,
								"num": 60,
								"period": ""
							},
						}
					});
					let js = JSON.parse(post(buildUrl('https://u.y.qq.com/cgi-bin/musics.fcg', {
						_: Date.now(),
						sign: sign(body)
					}), {
						body: body
					})).req_1.data;
					let json = js.songInfoList.map(j => {
						return {
							title: j.title,
							singer: j.singer[0].name,
							album: j.album.name,
							pic: j.album.mid,
							id: j.mid
						};
					});
					let intro = js.data.intro.replace(/<br\s*\/?>/gi, '');
					if (MY_PAGE == 1) {
						d.push({
							title: intro,
							col_type: 'movie_1_vertical_pic_blur',
							desc: '🧸\t' + js.data.titleShare + '\n\n🎼\t' + js.data.totalNum + '首',
							pic: js.data.frontPicUrl,
							url: 'hiker://empty',
							extra: {
								gradient: true
							}
						});
					}
					json.map(j => {
						d.push({
							title: j.title,
							col_type: 'text_1',
							desc: j.album ? j.singer + ' -- ' + j.album : j.singer + ' -- ' + j.title,
							pic_url: j.pic + '@Referer=',
							url: $('#noLoading##noHistory##noRecordHistory#').lazyRule((j) => {
								try {
									let js = JSON.parse(fetch('https://zj.v.api.aa1.cn/api/qqmusic/demo.php?type=1&p=1&n=1&q=' + j.title + ' ' + j.singer)).list.map(d => {
										let url = d.url.replace('t=3', 't=1');
										return url;
									});
									var url = [js + '#isMusic=true#'];

									function sign(params) {
										function middle(ls) {
											let resNum = [];

											function test(a, b, c) {
												let r25 = a >> 2;
												if (b !== undefined && c !== undefined) {
													let r26 = a & 3;
													let r26_2 = r26 << 4;
													let r26_3 = b >> 4;
													let r26_4 = r26_2 | r26_3;
													let r27 = b & 15;
													let r27_2 = r27 << 2;
													let r27_3 = r27_2 | (c >> 6);
													let r28 = c & 63;
													resNum.push(r25);
													resNum.push(r26_4);
													resNum.push(r27_3);
													resNum.push(r28);
												} else {
													let r10 = a >> 2;
													let r11 = a & 3;
													let r11_2 = r11 << 4;
													resNum.push(r10);
													resNum.push(r11_2);
												}
											}
											for (let i = 0; i < ls.length; i += 3) {
												if (ls[i] !== undefined && ls[i + 1] !== undefined && ls[i + 2] !== undefined) {
													test(ls[i], ls[i + 1], ls[i + 2]);
												} else {
													test(ls[i], undefined, undefined);
												}
											}
											let res = [];
											resNum.forEach((item) => {
												let zd = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
												res.push(zd[item]);
											});
											res = res.join('');
											return res;
										}

										function head(md5Str) {
											let res = [];
											[21, 4, 9, 26, 16, 20, 27, 30].map(x => {
												res.push(md5Str[x]);
											});
											return res.join('');
										}

										function tail(md5Str) {
											let res = [];
											[18, 11, 3, 2, 1, 7, 6, 25].map(x => {
												res.push(md5Str[x]);
											});
											return res.join('');
										}

										function getLs(md5Str) {
											let zd = {
												"0": 0,
												"1": 1,
												"2": 2,
												"3": 3,
												"4": 4,
												"5": 5,
												"6": 6,
												"7": 7,
												"8": 8,
												"9": 9,
												"A": 10,
												"B": 11,
												"C": 12,
												"D": 13,
												"E": 14,
												"F": 15
											};
											let ol = [212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6];
											let res = [];
											let j = 0;
											for (let i = 0; i < md5Str.length; i += 2) {
												let one = zd[md5Str[i]];
												let two = zd[md5Str[i + 1]];
												let r = one * 16 ^ two;
												res.push(r ^ ol[j]);
												j += 1;
											}
											return res;
										}
										let md5Str = md5(params).toUpperCase();
										let h = head(md5Str);
										let e = tail(md5Str);
										let ls = getLs(md5Str);
										let m = middle(ls);
										let res = ('zzb' + h + m + e).toLowerCase();
										let r = RegExp(/[\\/+]/g);
										res = res.replace(r, '');
										return res;
									}
									let body = JSON.stringify({
										"comm": {
											"cv": 4747474,
											"ct": 24,
											"format": "json",
											"inCharset": "utf-8",
											"outCharset": "utf-8",
											"notice": 0,
											"platform": "yqq.json",
											"needNewCode": 1,
											"uin": 0,
											"g_tk_new_20200303": 5381,
											"g_tk": 5381
										},
										"req_1": {
											"module": "music.musichallSong.PlayLyricInfo",
											"method": "GetPlayLyricInfo",
											"param": {
												"songMID": j.id
											}
										}
									});
									let lyric = JSON.parse(post(buildUrl('https://u.y.qq.com/cgi-bin/musics.fcg', {
										_: Date.now(),
										sign: sign(body)
									}), {
										body: body
									})).req_1.data.lyric;
									var lrc = base64Decode(lyric);
								} catch (e) {
									var json = JSON.parse(fetch('https://xiaoapi.cn/API/mv_sq.php?n=1&msg=' + j.title, {
										timeout: 2000
									})).url;
									var url = [json[3] || json[2] || json[1] || json[0]];
								}
								return JSON.stringify({
									urls: url,
									lyric: lrc
								})
							}, j),
							extra: {
								inheritTitle: false,
								longClick: [{
									title: '下载歌曲',
									js: $.toString((j) => {
										let url = JSON.parse(fetch('https://zj.v.api.aa1.cn/api/qqmusic/demo.php?type=1&p=1&n=1&q=' + j.title + ' ' + j.singer)).list.map(d => {
											let url = d.url.replace('t=3', 't=1');
											return url;
										});
										return 'download://' + url
									}, j)
								}, {
									title: '观看MV',
									js: $.toString((j) => {
										try {
											var json = JSON.parse(fetch('https://xiaoapi.cn/API/mv_sq.php?n=1&msg=' + j.title, {
												timeout: 2000
											})).url;
											var url = [json[3] || json[2] || json[1] || json[0]];
										} catch (e) {
											var url = [JSON.parse(fetch('https://api.cenguigui.cn/api/juhe/api.php?type=kgmv&n=1&msg=' + j.title, {
												timeout: 2000
											})).data.url];
										}
										return 'video://' + url
									}, j)
								}],
							}
						});
					});
					setResult(d);
				}, id)
			}, gedan)
		}),
	}); /*网易排行榜歌单_开始*/
	d.push({
		title: '‘‘’’小芸<small> 榜单</small>',
		col_type: 'icon_3_round_fill',
		pic: 'hiker://files/zf2629/svg/网易.svg',
		url: $('#noLoading#').lazyRule(() => {
			var gedan = JSON.parse(fc('http://music.163.com/api/toplist', 24)).list.map(l => {
				return {
					title: l.name,
					icon: l.coverImgUrl,
					id: l.id
				};
			});
			return $(gedan, 2, '小芸排行榜').select((gedan) => {
				let a = gedan.findIndex(t => t.title == input);
				let id = gedan[a].id;
				return $('hiker://empty#immersiveTheme##noHistory##noRecordHistory#').rule((id) => {
					let d = [];
					setPageTitle('小芸歌单');
					let html = JSON.parse(fetch('http://music.163.com/api/v6/playlist/detail?n=1000&id=' + id, {
						headers: {
							"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
							"Cookie": "os=pc; MUSIC_U=00173997E57DC16112D2E1579F555444812E5133F16C34213D9BB5E3ECEC818845DF8A336A3B9D495EE182F3001AFEAF9E971591CCEDC4713842F3296A1E79DFB7817A8C7BB8154FF15483648F184D0E72D7D26A565E44507380824902C2152CC0BB5DB9A379E80F6F03D0D98B2793A20323034DE4A0BBB4672D48F9362960EF2136153D02E7DF14C9CE84F1F64C16EB307A5BBB58686C6095082AA450583E64EACD3E6B5BE0DFCACA9125F035057FE17B5BDA61D89DF5ABD77906F5E5D858C74DB2E178A3B0E6095DD75518D482DC9D61080A61D9B765D7E98EBE230CF017CD90208392D3E10DE964A68121B6C66D08C902A98ED7113AAE59D1E5559B071DE83126B8C295C780CCD4B0B4DE36E35C09AA634355AEDE2F880998719277E5EF9C7B9CAFFC90E279AAA2BAFCA44C0A83537D609E2DAA5D5D774848C98DD287118895C1C3D6574466F9262DECE07292AC157C1DB70CB703958A7FE55344E273422E69"
						}
					})).playlist;
					let json = html.tracks.map(j => {
						let singer = j.ar.map(n => n.name);
						return {
							title: j.name,
							singer: singer,
							album: j.tns,
							pic: j.al.picUrl,
							id: j.id,
							vid: j.mv
						};
					});
					d.push({
						title: html.description,
						col_type: 'movie_1_vertical_pic_blur',
						desc: '🧸\t' + html.creator.nickname + '\n\n🎼\t' + html.trackCount + '首',
						pic: html.coverImgUrl,
						url: 'hiker://empty',
						extra: {
							gradient: true
						}
					});
					json.map(j => {
						d.push({
							title: j.title,
							col_type: 'text_1',
							desc: j.album ? j.singer + ' -- ' + j.album : j.singer + ' -- ' + j.title,
							pic_url: j.pic + '@Referer=',
							url: $('#noLoading##noHistory##noRecordHistory#').lazyRule((j) => {
								try {
									var js = JSON.parse(fetch('https://www.hhlqilongzhu.cn/api/dg_wyymusic.php?br=7&n=1&num=&type=json&id=' + j.id)).music_url;
								} catch (e) {
									var js = ('https://music.163.com/song/media/outer/url?id=' + j.id);
								}
								let url = [js + '#isMusic=true#'];
								try {
									var lrc = JSON.parse(fetch('http://music.163.com/api/song/lyric?os=pc&lv=-1&kv=-1&tv=-1&id=' + j.id)).lrc.lyric;
								} catch {}
								return JSON.stringify({
									urls: url,
									lyric: lrc
								})
							}, j),
							extra: {
								inheritTitle: false,
								longClick: [{
									title: '下载歌曲',
									js: $.toString((j) => {
										try {
											var url = JSON.parse(fetch('https://www.hhlqilongzhu.cn/api/dg_wyymusic.php?br=7&n=1&num=&type=json&id=' + j.id)).music_url;
										} catch (e) {
											var url = ('https://music.163.com/song/media/outer/url?id=' + j.id);
										}
										return 'download://' + url
									}, j)
								}, {
									title: '观看MV',
									js: $.toString((j) => {
										if (j.vid == '0') {
											var url = JSON.parse(fetch('https://api.cenguigui.cn/api/juhe/api.php?type=kgmv&n=1&msg=' + j.title)).data.url;
										} else {
											var url = 'https://hub.onmicrosoft.cn/public/video/ncm?raw=true&vid=' + j.vid;
										}
										return 'video://' + url
									}, j)
								}],
							}
						});
					});
					setResult(d);
				}, id)
			}, gedan)
		}),
	}); /*网易排行榜歌单_结束*/
	d.push({
		title: getItem('kwgd', 'new') == 'new' ? '‘‘’’小莴<small> 最新</small>' : '‘‘’’小莴<small> 最热</small>',
		col_type: 'icon_3_round_fill',
		pic: 'hiker://files/zf2629/svg/酷我.svg',
		url: $('#noLoading#').lazyRule(() => {
			setItem('kwgd', getItem('kwgd', 'new') == 'new' ? 'hot' : 'new');
			refreshPage(false);
			toast('已切换' + (getItem('kwgd', 'new') == 'new' ? '最新歌单' : '最热歌单'));
			return 'hiker://empty'
		}),
	}, {
		title: '搜索',
		col_type: 'input',
		desc: '👉🏻 歌名、歌手、榜单名称',
		url: $.toString(() => {
			/*if (!input) return "toast://请输入关键词搜索";*/
			if (!input) return 'hiker://localMedia';
			var txt = input;
			setItem('sspt_input', txt); /*音乐搜索引擎_开始*/
			return "select://" + JSON.stringify({
				options: ["小七", "小芸", "小莴"],
				attachView: true,
				js: $.toString((txt) => {
					if (input == '小七') {
						return $('hiker://empty#fypage#immersiveTheme##noHistory##noRecordHistory#').rule((txt) => {
							setPageTitle('小七搜索');
							let d = [];
							let json = JSON.parse(fetch('https://u.y.qq.com/cgi-bin/musicu.fcg', {
								headers: {
									'content-type': 'application/json',
								},
								method: 'POST',
								body: {
									"comm": {
										"ct": 19,
										"cv": 1845
									},
									"date": {
										"method": "DoSearchForQQMusicDesktop",
										"module": "music.search.SearchCgiService",
										"param": {
											"query": txt,
											"num_per_page": 30,
											"page_num": MY_PAGE
										}
									}
								}
							})).date.data.body.song.list.map(j => {
								return {
									title: j.title,
									singer: j.singer[0].name,
									pic: "https://y.gtimg.cn/music/photo_new/T002R300x300M000" + j.album.mid + ".jpg",
									album: j.album.name,
									id: j.mid
								};
							});
							if (MY_PAGE == 1) {
								d.push({
									title: '🔎\t' + txt,
									col_type: 'movie_1_vertical_pic_blur',
									desc: '🧸\t听点音乐\n\n🎨\t永远相信美好的事情即将发生！',
									pic: json[0].pic,
									url: 'hiker://empty',
									extra: {
										gradient: true
									}
								});
							}
							json.forEach(j => {
								d.push({
									title: j.title,
									col_type: 'text_1',
									desc: j.album ? j.singer + ' -- ' + j.album : j.singer + ' -- ' + j.title,
									pic_url: j.pic + '@Referer=',
									url: $('#noLoading##noHistory##noRecordHistory#').lazyRule((j) => {
										try {
											let js = JSON.parse(fetch('https://zj.v.api.aa1.cn/api/qqmusic/demo.php?type=1&p=1&n=1&q=' + j.title)).list.map(d => {
												let url = d.url.replace('t=3', 't=1');
												return url;
											});
											var url = [js + '#isMusic=true#'];

											function sign(params) {
												function middle(ls) {
													let resNum = [];

													function test(a, b, c) {
														let r25 = a >> 2;
														if (b !== undefined && c !== undefined) {
															let r26 = a & 3;
															let r26_2 = r26 << 4;
															let r26_3 = b >> 4;
															let r26_4 = r26_2 | r26_3;
															let r27 = b & 15;
															let r27_2 = r27 << 2;
															let r27_3 = r27_2 | (c >> 6);
															let r28 = c & 63;
															resNum.push(r25);
															resNum.push(r26_4);
															resNum.push(r27_3);
															resNum.push(r28);
														} else {
															let r10 = a >> 2;
															let r11 = a & 3;
															let r11_2 = r11 << 4;
															resNum.push(r10);
															resNum.push(r11_2);
														}
													}
													for (let i = 0; i < ls.length; i += 3) {
														if (ls[i] !== undefined && ls[i + 1] !== undefined && ls[i + 2] !== undefined) {
															test(ls[i], ls[i + 1], ls[i + 2]);
														} else {
															test(ls[i], undefined, undefined);
														}
													}
													let res = [];
													resNum.forEach((item) => {
														let zd = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
														res.push(zd[item]);
													});
													res = res.join('');
													return res;
												}

												function head(md5Str) {
													let res = [];
													[21, 4, 9, 26, 16, 20, 27, 30].map(x => {
														res.push(md5Str[x]);
													});
													return res.join('');
												}

												function tail(md5Str) {
													let res = [];
													[18, 11, 3, 2, 1, 7, 6, 25].map(x => {
														res.push(md5Str[x]);
													});
													return res.join('');
												}

												function getLs(md5Str) {
													let zd = {
														"0": 0,
														"1": 1,
														"2": 2,
														"3": 3,
														"4": 4,
														"5": 5,
														"6": 6,
														"7": 7,
														"8": 8,
														"9": 9,
														"A": 10,
														"B": 11,
														"C": 12,
														"D": 13,
														"E": 14,
														"F": 15
													};
													let ol = [212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6];
													let res = [];
													let j = 0;
													for (let i = 0; i < md5Str.length; i += 2) {
														let one = zd[md5Str[i]];
														let two = zd[md5Str[i + 1]];
														let r = one * 16 ^ two;
														res.push(r ^ ol[j]);
														j += 1;
													}
													return res;
												}
												let md5Str = md5(params).toUpperCase();
												let h = head(md5Str);
												let e = tail(md5Str);
												let ls = getLs(md5Str);
												let m = middle(ls);
												let res = ('zzb' + h + m + e).toLowerCase();
												let r = RegExp(/[\\/+]/g);
												res = res.replace(r, '');
												return res;
											}
											let body = JSON.stringify({
												"comm": {
													"cv": 4747474,
													"ct": 24,
													"format": "json",
													"inCharset": "utf-8",
													"outCharset": "utf-8",
													"notice": 0,
													"platform": "yqq.json",
													"needNewCode": 1,
													"uin": 0,
													"g_tk_new_20200303": 5381,
													"g_tk": 5381
												},
												"req_1": {
													"module": "music.musichallSong.PlayLyricInfo",
													"method": "GetPlayLyricInfo",
													"param": {
														"songMID": j.id
													}
												}
											});
											let lyric = JSON.parse(post(buildUrl('https://u.y.qq.com/cgi-bin/musics.fcg', {
												_: Date.now(),
												sign: sign(body)
											}), {
												body: body
											})).req_1.data.lyric;
											var lrc = base64Decode(lyric);
										} catch {
											var json = JSON.parse(fetch('https://xiaoapi.cn/API/mv_sq.php?n=1&msg=' + j.title, {
												timeout: 2000
											})).url;
											var url = [json[3] || json[2] || json[1] || json[0]];
										}
										return JSON.stringify({
											urls: url,
											lyric: lrc
										})
									}, j),
									extra: {
										inheritTitle: false,
										longClick: [{
											title: '下载歌曲',
											js: $.toString((j) => {
												let url = JSON.parse(fetch('https://zj.v.api.aa1.cn/api/qqmusic/demo.php?type=1&p=1&n=1&q=' + j.title)).list.map(d => {
													let url = d.url.replace('t=3', 't=1');
													return url;
												});
												return 'download://' + url
											}, j)
										}, {
											title: '观看MV',
											js: $.toString((j) => {
												try {
													var json = JSON.parse(fetch('https://xiaoapi.cn/API/mv_sq.php?n=1&msg=' + j.title, {
														timeout: 2000
													})).url;
													var url = [json[3] || json[2] || json[1] || json[0]];
												} catch (e) {
													var url = [JSON.parse(fetch('https://api.cenguigui.cn/api/juhe/api.php?type=kgmv&n=1&msg=' + j.title, {
														timeout: 2000
													})).data.url];
												}
												return JSON.stringify({
													urls: url,
												})
											}, j)
										}],
									}
								});
							});
							setResult(d);
						}, txt)
					} else if (input == '小芸') {
						return $('hiker://empty#immersiveTheme##noHistory##noRecordHistory#').rule((txt) => {
							setPageTitle('小芸搜索');
							let d = [];
							let json = JSON.parse(fetch('http://music.163.com/api/search/get/web?type=1&offset=0&limit=90&s=' + txt)).result.songs.map(j => {
								let singer = j.artists.map(s => s.name);
								return {
									title: j.name,
									singer: singer[0],
									pic: 'https://wanghun.top/qqmusic/wymusic.php?type=pic&id=' + j.id,
									album: j.album.name,
									id: j.id,
									vid: j.mvid
								};
							});
							if (MY_PAGE == 1) {
								d.push({
									title: '🔎\t' + txt,
									col_type: 'movie_1_vertical_pic_blur',
									desc: '🧸\t听点音乐\n\n🎨\t永远相信美好的事情即将发生！',
									pic: json[0].pic,
									url: 'hiker://empty',
									extra: {
										gradient: true
									}
								});
							}
							json.map(j => {
								d.push({
									title: j.title,
									col_type: 'text_1',
									pic_url: j.pic + '@Referer=',
									desc: j.album ? j.singer + ' -- ' + j.album : j.singer + ' -- ' + j.title,
									url: $('#noLoading##noHistory##noRecordHistory#').lazyRule((j) => {
										try {
											var js = JSON.parse(fetch('https://www.hhlqilongzhu.cn/api/dg_wyymusic.php?br=7&n=1&num=&type=json&id=' + j.id)).music_url;
										} catch (e) {
											var js = ('https://music.163.com/song/media/outer/url?id=' + j.id);
										}
										var url = [js + '#isMusic=true#'];
										try {
											var lrc = JSON.parse(fetch('http://music.163.com/api/song/lyric?os=pc&lv=-1&kv=-1&tv=-1&id=' + j.id)).lrc.lyric;
										} catch {}
										return JSON.stringify({
											urls: url,
											lyric: lrc
										})
									}, j),
									extra: {
										inheritTitle: false,
										longClick: [{
											title: '下载歌曲',
											js: $.toString((j) => {
												try {
													var url = JSON.parse(fetch('https://www.hhlqilongzhu.cn/api/dg_wyymusic.php?br=7&n=1&num=&type=json&id=' + j.id)).music_url;
												} catch (e) {
													var url = ('https://music.163.com/song/media/outer/url?id=' + j.id);
												}
												return 'download://' + url
											}, j)
										}, {
											title: '观看MV',
											js: $.toString((j) => {
												if (j.vid == '0') {
													var url = JSON.parse(fetch('https://api.cenguigui.cn/api/juhe/api.php?type=kgmv&n=1&msg=' + j.title)).data.url;
												} else {
													var url = 'https://hub.onmicrosoft.cn/public/video/ncm?raw=true&vid=' + j.vid;
												}
												return 'video://' + url
											}, j)
										}],
									}
								});
							});
							setResult(d);
						}, txt)
					} else {
						return $('hiker://empty#fypage#immersiveTheme##noHistory##noRecordHistory#').rule((txt) => {
							setPageTitle('小莴搜索');
							let d = [];
							let json = JSON.parse(fetch('https://search.kuwo.cn/r.s?client=kt&pn=' + (MY_PAGE - 1) + '&rn=30&vipver=1&ft=music&encoding=utf8&rformat=json&mobi=1&all=' + txt)).abslist.map(j => {
								let img = ('http://img1.kwcdn.kuwo.cn/star/albumcover/500' + j.web_albumpic_short.split('120')[1]);
								return {
									title: j.SONGNAME,
									singer: j.ARTIST,
									pic: img,
									album: j.ALBUM,
									rid: j.DC_TARGETID,
									vid: j.mvpayinfo.vid
								};
							});
							if (MY_PAGE == 1) {
								d.push({
									title: '🔎\t' + txt,
									pic: json[0].pic,
									col_type: 'movie_1_vertical_pic_blur',
									desc: '🧸\t听点音乐\n\n🎨\t永远相信美好的事情即将发生！',
									url: 'hiker://empty',
									extra: {
										gradient: true
									}
								});
							}
							json.map(j => {
								d.push({
									title: j.title,
									col_type: 'text_1',
									pic: j.pic + '@Referer=',
									desc: j.album ? j.singer + ' -- ' + j.album : j.singer + ' -- ' + j.title,
									url: $('#noLoading##noHistory##noRecordHistory#').lazyRule((j) => {
										try {
											var js = JSON.parse(fetch('https://www.hhlqilongzhu.cn/api/dg_kuwomusic.php?n=1&type=json&msg=' + j.title)).flac_url;
										} catch (e) {
											var js = JSON.parse(fetch('https://oiapi.net/API/Kuwo/?n=1&br=1&msg=' + j.title)).data.url;
										}
										let url = [js + '#isMusic=true#'];
										try {
											var lrc = JSON.parse(fetch("https://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=" + j.rid)).data.lrclist.map(d => {
												​​
												let s = (d.time % 60).toFixed(2).padStart(5, '0');
												let m = ((d.time - s) / 60).toFixed(0).padStart(2, '0');
												return '[' + m + ':' + s + ']' + d.lineLyric​
											}).join('\n');
										} catch {}
										return JSON.stringify({
											urls: url,
											lyric: lrc
										})
									}, j),
									extra: {
										inheritTitle: false,
										longClick: [{
											title: '下载歌曲',
											js: $.toString((j) => {
												try {
													var url = JSON.parse(fetch('https://www.hhlqilongzhu.cn/api/dg_kuwomusic.php?n=1&type=json&msg=' + j.title)).flac_url;
												} catch (e) {
													var url = JSON.parse(fetch('https://oiapi.net/API/Kuwo/?n=1&br=1&msg=' + j.title)).data.url;
												}
												return 'download://' + url
											}, j)
										}, {
											title: '观看MV',
											js: $.toString((j) => {
												if (j.vid == '0') {
													var url = JSON.parse(fetch('https://api.suyanw.cn/api/kg_mv.php?n=1&msg=' + j.title)).data.url;
												} else {
													let html = fetch('https://anymatch.kuwo.cn/mobi.s?f=web&user=6f173cf9a2a9da4c&source=kwplayer_ar_10.8.2.2_138.apk&type=get_url_by_vid&quality=MP4HV&p2pid=1&vid=' + j.vid);
													let a = html.split('=')[3];
													let b = a.split('?')[0];
													var url = b;
												}
												return 'video://' + url
											}, j)
										}],
									}
								});
							});
							setResult(d);
						}, txt)
					}
				}, txt)
			})
		}),
		extra: {
			defaultValue: getItem('sspt_input', ''),
			onChange: 'setItem("sspt_input",input)'
		}
	}); /*音乐搜索引擎_结束*/
} /*固定翻页1结束*/ /*酷我音乐歌单_开始*/
let kwgd = getItem('kwgd', 'new');
let html = ('http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?loginUid=0&loginSid=0&appUid=76039576&&pn=' + MY_PAGE + '&rn=36&order=' + kwgd);
var json = JSON.parse(fetch(html)).data;
json.data.map(data => {
	d.push({
		title: data.name,
		col_type: 'card_pic_3',
		pic: data.img,
		url: $('hiker://empty#fypage#immersiveTheme##noHistory##noRecordHistory#').rule((data) => {
			setPageTitle('小莴歌单');
			let d = [];
			let html = JSON.parse(fetch('https://m.kuwo.cn/newh5app/wapi/api/www/playlist/playListInfo?pid=' + data.id + '&rn=30&ua=&ip=&pn=' + MY_PAGE)).data;
			var json = html.musicList.map(j => {
				return {
					title: j.name,
					singer: j.artist,
					album: j.album,
					pic: j.pic,
					id: j.rid,
					vid: j.mvpayinfo.vid,
					time: j.songTimeMinutes
				};
			});
			if (MY_PAGE == 1) {
				d.push({
					title: html.name,
					col_type: 'movie_1_vertical_pic_blur',
					pic: html.img700 || html.uPic,
					desc: '🧸\t' + html.userName + '\n\n🎼\t' + data.total + '首',
					url: 'hiker://empty',
					extra: {
						gradient: true
					}
				});
			}
			json.map(j => {
				d.push({
					title: j.title,
					col_type: 'text_1',
					desc: j.album ? j.singer + ' -- ' + j.album : j.singer + ' -- ' + j.title,
					pic: j.pic + '@Referer=',
					url: $('#noLoading##noHistory##noRecordHistory#').lazyRule((j) => {
						try {
							var js = JSON.parse(fetch('https://www.hhlqilongzhu.cn/api/dg_kuwomusic.php?n=1&type=json&msg=' + j.title)).flac_url;
						} catch (e) {
							var js = JSON.parse(fetch('https://oiapi.net/API/Kuwo/?n=1&br=1&msg=' + j.title)).data.url;
						}
						let url = [js + '#isMusic=true#'];
						try {
							var lrc = JSON.parse(fetch("https://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=" + j.id)).data.lrclist.map(d => {
								​​
								let s = (d.time % 60).toFixed(2).padStart(5, '0');
								let m = ((d.time - s) / 60).toFixed(0).padStart(2, '0');
								return '[' + m + ':' + s + ']' + d.lineLyric​
							}).join('\n');
						} catch {}
						return JSON.stringify({
							urls: url,
							lyric: lrc
						})
					}, j),
					extra: {
						inheritTitle: false,
						longClick: [{
							title: '下载歌曲',
							js: $.toString((j) => {
								try {
									var url = JSON.parse(fetch('https://www.hhlqilongzhu.cn/api/dg_kuwomusic.php?n=1&type=json&msg=' + j.title)).flac_url;
								} catch (e) {
									var url = JSON.parse(fetch('https://oiapi.net/API/Kuwo/?n=1&br=1&msg=' + j.title)).data.url;
								}
								return 'download://' + url
							}, j)
						}, {
							title: '观看MV',
							js: $.toString((j) => {
								if (j.vid == '0') {
									var url = JSON.parse(fetch('https://api.suyanw.cn/api/kg_mv.php?n=1&msg=' + j.title)).data.url;
								} else {
									let html = fetch('https://anymatch.kuwo.cn/mobi.s?f=web&user=6f173cf9a2a9da4c&source=kwplayer_ar_10.8.2.2_138.apk&type=get_url_by_vid&quality=MP4HV&p2pid=1&vid=' + j.vid);
									let a = html.split('=')[3];
									let b = a.split('?')[0];
									var url = b;
								}
								return 'video://' + url
							}, j)
						}],
					}
				});
			});
			setResult(d);
		}, data),
	});
}); /*酷我音乐歌单_结束*/
setResult(d);
