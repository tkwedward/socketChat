"use strict";
exports.__esModule = true;
exports.createNewPageEvent = exports.insertNewPage = exports.createNewPage = exports.updatePageNumberInNewOrder = exports.updatePageController = exports.createSwitchViewModeButton = exports.pageController = exports.functionButtonCreater = exports.createSubPanelItem = exports.createSubPanel = void 0;
var pkmDatabase = [{ "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cf47f9fac4ed3037ff2a8ea83204e32aff8fb5f3.png", "number": "001", "name": "妙蛙種子", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/3245e4f8c04aa0619cb31884dbf123c6918b3700.png", "number": "002", "name": "妙蛙草", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/0186d64c5773c8d3d03cd05dc79574b2d2798d4f.png", "number": "003", "name": "妙蛙花", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/3bfcc4360c44f37815dc1e59f75818935cbfc41b.png", "number": "003", "name": "超級妙蛙花", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/6b55babb3825ef9fa9e5d9ff44a14bdb8406ce97.png", "number": "003", "name": "妙蛙花", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/d0ee81f16175c97770192fb691fdda8da1f4f349.png", "number": "004", "name": "小火龍", "type": "火" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/285395ca77d82861fd30cea64567021a50c1169c.png", "number": "005", "name": "火恐龍", "type": "火" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2050f1fd1283f473d7d048f8631712e7e003f802.png", "number": "006", "name": "噴火龍", "type": "火, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/ca3db4aad5c85a525d9be86852b26db1db7a22c0.png", "number": "006", "name": "超級噴火龍Ｘ", "type": "火, 龍" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/0aa78a0061bda9d88cbb0bbf739cd9cc56522fe9.png", "number": "006", "name": "超級噴火龍Ｙ", "type": "火, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2fd12098f15628cce80d411e090189aeb7d758ff.png", "number": "006", "name": "噴火龍", "type": "火, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/5794f0251b1180998d72d1f8568239620ff5279c.png", "number": "007", "name": "傑尼龜", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/a3bc17e6215031332462cc64e59b7922ddd14b91.png", "number": "008", "name": "卡咪龜", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2fe157db59153af8abd636ab03c7df6f28b08242.png", "number": "009", "name": "水箭龜", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/00186af714a048895ba8116e71b08671c3cfb8f5.png", "number": "009", "name": "超級水箭龜", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/50eba0f85c4e9a039be078e7de0b10acc7323264.png", "number": "009", "name": "水箭龜", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/68f0cec6bcba20a0c53db3d8cfce81bd319d2c82.png", "number": "010", "name": "綠毛蟲", "type": "蟲" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/05fd4676fa4a4b58288510a97a5211e066e02464.png", "number": "011", "name": "鐵甲蛹", "type": "蟲" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/eacd20285cb634ba9fea41fc0fa13871c2fcbc66.png", "number": "012", "name": "巴大蝶", "type": "蟲, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/b76026363e301dbd8ac3f084e7d242232c46c95f.png", "number": "012", "name": "巴大蝶", "type": "蟲, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/5ae74d403ec682eaf13e066850afd4b0c20d85f7.png", "number": "013", "name": "獨角蟲", "type": "蟲, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/dd41f31a3c97f1f9d998361b125362584873157b.png", "number": "014", "name": "鐵殼蛹", "type": "蟲, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/70f4206271b72492c9ba71d708d6183a80ba0e96.png", "number": "015", "name": "大針蜂", "type": "蟲, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/e12ce48ab99b2df6fbbc1e97038c4f6e192d09d7.png", "number": "015", "name": "超級大針蜂", "type": "蟲, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/0e7c6e616404c683f00701b591eeab56e465641a.png", "number": "016", "name": "波波", "type": "一般, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/a2935587b7c61e6e6da88da3578d700c133246e5.png", "number": "017", "name": "比比鳥", "type": "一般, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/01e13954dff668c1420407c98b308c81b83f6dda.png", "number": "018", "name": "大比鳥", "type": "一般, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/dd6ab4ce8e7d05fb74e50cf66764e3ed8e11a097.png", "number": "018", "name": "超級大比鳥", "type": "一般, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/3e4b38ab7545ebd938154d9aed9502cb068569d6.png", "number": "019", "name": "小拉達", "type": "一般" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/3567693e3479fb0cf15b9ec84ee8a033aa7b4310.png", "number": "019", "name": "小拉達", "type": "惡, 一般" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/e97c62e4e4b46017be60806d00f4d389d003f115.png", "number": "020", "name": "拉達", "type": "一般" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/a30454b7040a4a517bfe0914777e2e7c045f6c65.png", "number": "020", "name": "拉達", "type": "惡, 一般" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/e815cb4b8ba9c2d0841dfa364c87164880944e3a.png", "number": "021", "name": "烈雀", "type": "一般, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/8b326a6f77b73b3c250ba95f3a97fc21b28c8f4b.png", "number": "022", "name": "大嘴雀", "type": "一般, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/ad90ec632849d032615d707ebe8ad741651eee06.png", "number": "023", "name": "阿柏蛇", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/eb3c14ed44c1e4a2ba4c2d7970cddf07cd8ef67f.png", "number": "024", "name": "阿柏怪", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png", "number": "025", "name": "皮卡丘", "type": "電" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/a90881f103830615ee7f85e16fe9f586d41f2332.png", "number": "025", "name": "皮卡丘", "type": "電" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/9c28defa939e230800ec0d0c421d9f82c60df77a.png", "number": "026", "name": "雷丘", "type": "電" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/8be55a3ff2b24890fac0b9e2415dda9d0f893c1f.png", "number": "026", "name": "雷丘", "type": "電, 超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/f5fcf7a292a180320138ace7235f8a2c16f6594a.png", "number": "027", "name": "穿山鼠", "type": "地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/d9ea1612a6ec53ba12e2d9abe28f99e66021bde1.png", "number": "027", "name": "穿山鼠", "type": "冰, 鋼" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/d00d72f082b7dae546fa8bd5cf09fcfe53ffcae8.png", "number": "028", "name": "穿山王", "type": "地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cc154af4dcd20d14aba494a6a679f528bb9f3d6d.png", "number": "028", "name": "穿山王", "type": "冰, 鋼" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/14179c8ab9c2003fc5b27a29e91e4cd195283d52.png", "number": "029", "name": "尼多蘭", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/fed980fd2341745923812e9dcd88a039aaaf36ea.png", "number": "030", "name": "尼多娜", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/5174a41a9db00baf5dd664c92a12254b0baa5fde.png", "number": "031", "name": "尼多后", "type": "毒, 地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/237579eaf2141edad61d647c62f074d53653337b.png", "number": "032", "name": "尼多朗", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/f3d8e45646fb05516dff845922c3d62d9aa33cbe.png", "number": "033", "name": "尼多力諾", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/ce24d9eb27f4e554ea5bd29840a35957f7bd9d30.png", "number": "034", "name": "尼多王", "type": "毒, 地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/18e9dc86ced1320d6846f2c192c4eb04e517963a.png", "number": "035", "name": "皮皮", "type": "妖精" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/1865f85f9e417522f8de1a239fbff27f2106783b.png", "number": "036", "name": "皮可西", "type": "妖精" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/f285c634efd141918f6ad066a6f59c20746d9050.png", "number": "037", "name": "六尾", "type": "火" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/89719dbcbddd11a1e6bc5f4366e00910a04eaf9f.png", "number": "037", "name": "六尾", "type": "冰" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cc96e6a4eee980724ebd725bb8785334d3290074.png", "number": "038", "name": "九尾", "type": "火" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/397b20ea73c8358185d6f1d2971b5825b0cb0baf.png", "number": "038", "name": "九尾", "type": "冰, 妖精" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/7a2bec0dd522d66353f0cf3df9148070456a3349.png", "number": "039", "name": "胖丁", "type": "一般, 妖精" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/b3724395d41de1d0def948966c69148bd9f0f9c1.png", "number": "040", "name": "胖可丁", "type": "一般, 妖精" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/5d54b9d9cefa287ea258517537ba26f4103dda36.png", "number": "041", "name": "超音蝠", "type": "毒, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cedbf9afd3155d3df1e2ffebf049902598ebd74b.png", "number": "042", "name": "大嘴蝠", "type": "毒, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/6bad448cb0997a928b94e72b67eacb861271f796.png", "number": "043", "name": "走路草", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/62973d0fc5f9bd5d8c819b8c885bd1f216983ff1.png", "number": "044", "name": "臭臭花", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/a95af5f577260373074117cb756e5ea38cd674ef.png", "number": "045", "name": "霸王花", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/837bcac8efc9329d9e3b9e46e95670a5d493b60a.png", "number": "046", "name": "派拉斯", "type": "蟲, 草" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/e5838e76eb33d88601ba9d6e045e1bdf7e20f46a.png", "number": "047", "name": "派拉斯特", "type": "蟲, 草" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/8b550ab54d22a87dc784ee1af6cff4ad33aa10a2.png", "number": "048", "name": "毛球", "type": "蟲, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/c57d464a64424f031a9872f2ec3f7c0b8052d3c1.png", "number": "049", "name": "摩魯蛾", "type": "蟲, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/583fa625d6fda586a5734f5f9e455952aa6af15f.png", "number": "050", "name": "地鼠", "type": "地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/19bd3a09933b3e9a0a7156ef294091922dbf771e.png", "number": "050", "name": "地鼠", "type": "地面, 鋼" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/de7c2ea1a9f39427b4732a6122284f257f9e87aa.png", "number": "051", "name": "三地鼠", "type": "地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/7ba9403c475a889eadffb71b6cceae6e13c91a8e.png", "number": "051", "name": "三地鼠", "type": "地面, 鋼" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/6ea01871238908780334293e6407033650d803a9.png", "number": "052", "name": "喵喵", "type": "一般" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/57a0c88227aa0fe2327d79af31eb9516d4728752.png", "number": "052", "name": "喵喵", "type": "惡" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/704fc0cde74c862f2063faefcf40eb67752a8637.png", "number": "052", "name": "喵喵", "type": "鋼" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/bff57f3b31012cef1da149224a84180492f90ed4.png", "number": "052", "name": "喵喵", "type": "一般" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/8da0bb6b5587f2150f41b08e0d61a80827d7229f.png", "number": "053", "name": "貓老大", "type": "一般" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/4341e35269528c91e75b6516b820804a37d9eebf.png", "number": "053", "name": "貓老大", "type": "惡" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/0783062d0d860b8ae7d8e859241a700359c4d981.png", "number": "054", "name": "可達鴨", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/0dd5b6e921f55c5d49978b84ee66e458336518ae.png", "number": "055", "name": "哥達鴨", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/00fb5703d7c2b7a89933bbed89f4c84e48c59ea2.png", "number": "056", "name": "猴怪", "type": "格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/37a3edfcf9c5cbdb68bcf8945ff89fe2999e5a30.png", "number": "057", "name": "火爆猴", "type": "格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/333e2aef290059dc46274b77ea4095094784316a.png", "number": "058", "name": "卡蒂狗", "type": "火" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/7ef9e71e9dc624e5558d7b4619f75ea8659eff55.png", "number": "059", "name": "風速狗", "type": "火" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/8e8d47c5af6084904793496ddddb3e5f516e79f7.png", "number": "060", "name": "蚊香蝌蚪", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/7e16ace7443d45cc1def215c8cf82beefc69041c.png", "number": "061", "name": "蚊香君", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/da2fce266d1c13743742451617b2976d6bfd483d.png", "number": "062", "name": "蚊香泳士", "type": "水, 格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/5d05e6f2393a6a72fb36da26a79fd3db95ae7412.png", "number": "063", "name": "凱西", "type": "超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/96613b8fe63edfdf800cde823078fadc6ea9aae9.png", "number": "064", "name": "勇基拉", "type": "超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/265d42cf68deea0a54dacf3a4f1953198f55ad53.png", "number": "065", "name": "胡地", "type": "超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/6ef57b70dc74663cc1c203d7006e69cbad6bb15f.png", "number": "065", "name": "超級胡地", "type": "超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/0074c7d90ce7d2a6926d28fe777d2bcb0b4ccb0b.png", "number": "066", "name": "腕力", "type": "格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/634e1c205ab72071fe941043f816a9e2f31db3ae.png", "number": "067", "name": "豪力", "type": "格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/8f2f69ae05bd6c76f0d6fe6d03f1e22ec1a8010a.png", "number": "068", "name": "怪力", "type": "格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/aae2243d7c93e2cba33b000fbd92fcb050157d4e.png", "number": "068", "name": "怪力", "type": "格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/47ae88a63c66e32e957da303ad50b72268e097e4.png", "number": "069", "name": "喇叭芽", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/b19541cee78bc2a00eb3f59f7a2fcca67469eb78.png", "number": "070", "name": "口呆花", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/f010b09344a212ecb98c6f209233c0661db0e7a8.png", "number": "071", "name": "大食花", "type": "草, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/3da5f9c26f39884f5f44a861e6965fdc1722241b.png", "number": "072", "name": "瑪瑙水母", "type": "水, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/e8720bf3fe40182141dc5f442f5fb83eff544a6e.png", "number": "073", "name": "毒刺水母", "type": "水, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/4b483c95c2124018519380eaa06cc657c5b76a64.png", "number": "074", "name": "小拳石", "type": "岩石, 地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/c8870cfb5aae00c6b70d6550721b5bf51c73bf52.png", "number": "074", "name": "小拳石", "type": "岩石, 電" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/f3ae64c5acf41a159e07b63da847cccc773bb184.png", "number": "075", "name": "隆隆石", "type": "岩石, 地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/c91fbd40a228a6caa5f9b128715790fd536be2d6.png", "number": "075", "name": "隆隆石", "type": "岩石, 電" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/02fb8976b07089e975a9911ae2ff1327b5e3340d.png", "number": "076", "name": "隆隆岩", "type": "岩石, 地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/b7df1424a881e4d3232e6dd0ebc9d1908309e588.png", "number": "076", "name": "隆隆岩", "type": "岩石, 電" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/dacab2be1777c14ed7da12824dd85c2cdbd2ebf9.png", "number": "077", "name": "小火馬", "type": "火" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/5dc1659954564f3015fc72060bbd87b98808aed4.png", "number": "077", "name": "小火馬", "type": "超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cb874883fcffc227e8d065e275221e1e05ece46c.png", "number": "078", "name": "烈焰馬", "type": "火" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/ef678c969aef014b48cf390e0e04e3f0096020c9.png", "number": "078", "name": "烈焰馬", "type": "超能力, 妖精" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/441132f5cdf87b0e46f96952f16c2dfc75911054.png", "number": "079", "name": "呆呆獸", "type": "水, 超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/e1c9ec78e7a009185df15c4defd0db6b0c1a5727.png", "number": "079", "name": "呆呆獸", "type": "超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/4d93d1171a1b9551989b17b4ae6838e4e9e98378.png", "number": "080", "name": "呆殼獸", "type": "水, 超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/b4ff1375aa8d23aff0cc09a2f96773fbdd8e3843.png", "number": "080", "name": "超級呆殼獸", "type": "水, 超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/3862fc122debc9675749142a7c76f1a64dbbc60d.png", "number": "080", "name": "呆殼獸", "type": "毒, 超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/8dfff91e7e39b06d0a9fcfb414565b25de55bdf1.png", "number": "081", "name": "小磁怪", "type": "電, 鋼" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/5f8732c548e90780b660f65926e5567755aa2a6c.png", "number": "082", "name": "三合一磁怪", "type": "電, 鋼" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/810c4dc60ff4f315216717a2ecaa3c7dfe3fcf09.png", "number": "083", "name": "大蔥鴨", "type": "一般, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/47201403d2e427655cb49df00895018ef8d750fd.png", "number": "083", "name": "大蔥鴨", "type": "格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/63ff86cee884446925e664d99b82e3e8de988412.png", "number": "084", "name": "嘟嘟", "type": "一般, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/de41d6a29c38d65f1f39bc5ecb3afe30c5e057eb.png", "number": "085", "name": "嘟嘟利", "type": "一般, 飛行" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/fc1342f9b5bc761333a44d74dc47ba0ff30ad6c8.png", "number": "086", "name": "小海獅", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2a2e293a8524ac94136bada7346ddfe57e12e47e.png", "number": "087", "name": "白海獅", "type": "水, 冰" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/57f22ceb2f8765f927ff3fd1f4b4bf52a7033097.png", "number": "088", "name": "臭泥", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/61096756c8bfed61fbcc938bd3d964012f00cc89.png", "number": "088", "name": "臭泥", "type": "毒, 惡" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/db91b8849e602828aaff3939f9e0816dd9ce92ab.png", "number": "089", "name": "臭臭泥", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/d83b601f999b3df4c958c5e5bc8f1e5b21b2594b.png", "number": "089", "name": "臭臭泥", "type": "毒, 惡" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/36918010e6d91103c9017f4ce4d1764c9f145db8.png", "number": "090", "name": "大舌貝", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/d5ebac9e1afe16f2a1d16a7593e022fc576aed9e.png", "number": "091", "name": "刺甲貝", "type": "水, 冰" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/5c619391fb78cbe0d3646a9b76da07372a18580e.png", "number": "092", "name": "鬼斯", "type": "幽靈, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/b8bcfb490b9a54a7cfc607ac82f413f4e582cb56.png", "number": "093", "name": "鬼斯通", "type": "幽靈, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/47549471dc54feb8acd4b3de3a27ea8e9e9fd25c.png", "number": "094", "name": "耿鬼", "type": "幽靈, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/933fa0ef096191382ab20f5d6597ac7f8fbe336a.png", "number": "094", "name": "超級耿鬼", "type": "幽靈, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/fd3052b825dd7dc2d4f78043ecd94b57f9cad36a.png", "number": "094", "name": "耿鬼", "type": "幽靈, 毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/134d26303c22ac0e0173bdf5121a3a3aae10e36c.png", "number": "095", "name": "大岩蛇", "type": "岩石, 地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/1d82671099cdd52c4a0b84724d72033d305538bd.png", "number": "096", "name": "催眠貘", "type": "超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/9d0915f92dac45eca21a50d63799abe53404f7d4.png", "number": "097", "name": "引夢貘人", "type": "超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/15ec38c5c458545368bf8e85da77d49f4b09104d.png", "number": "098", "name": "大鉗蟹", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/04f0bfa98547db408430513e07a15e3655095dca.png", "number": "099", "name": "巨鉗蟹", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/416c9cf7dbb527e3eac9d3b1eff2a98e03016087.png", "number": "099", "name": "巨鉗蟹", "type": "水" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cfa3cfb38563c9afdb4d6fac40607fa78db97721.png", "number": "100", "name": "霹靂電球", "type": "電" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/823f1e2536f6036d7423f17fa4969ecd7cf08e00.png", "number": "101", "name": "頑皮雷彈", "type": "電" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b23bf26e6063e8fe37a5122a112abb1a475b052.png", "number": "102", "name": "蛋蛋", "type": "草, 超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/a17a1d3fbeeba958495697c23b287b1966fd11dc.png", "number": "103", "name": "椰蛋樹", "type": "草, 超能力" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/12017db6ac167715bbdc052ec40ae093e8cb7b7c.png", "number": "103", "name": "椰蛋樹", "type": "草, 龍" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/6c44a0ccb922bbb4345214f3fa0b9436a03c11f2.png", "number": "104", "name": "卡拉卡拉", "type": "地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/1a2a79bce9b5c63de4d6db9b895a34ce6bf6733d.png", "number": "105", "name": "嘎啦嘎啦", "type": "地面" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cce0a0732b1db5e9efba7effa7c51020ed94de60.png", "number": "105", "name": "嘎啦嘎啦", "type": "火, 幽靈" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/3e864b76679d4c2d1e46878dc241e06bdb8f8d1d.png", "number": "106", "name": "飛腿郎", "type": "格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/6c57fef755afbd6ddda7f3c21f20bb38159494c6.png", "number": "107", "name": "快拳郎", "type": "格鬥" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/fe41bccc4b1fd3c2ab748d09a157e3c0c28c7700.png", "number": "108", "name": "大舌頭", "type": "一般" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/fd10b57c1ac95c00638aed70b4a41d679e9af2b6.png", "number": "109", "name": "瓦斯彈", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/4c76d556bda94f8eb8b73a9e58ef051262e78b7d.png", "number": "110", "name": "雙彈瓦斯", "type": "毒" }, { "image": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/c89593cd44d8354c16c11f5fa10143a6a8b4ab1f.png", "number": "110", "name": "雙彈瓦斯", "type": "毒, 妖精" }];
//@auto-fold here
function createSubPanel(name, first) {
    var subPanelTemplate = document.querySelector("#subPanelTemplate");
    var subPanel = document.importNode(subPanelTemplate.content, true);
    console.log(subPanel);
    var subPanelNavbarTitle = subPanel.querySelector(".subPanelTitle");
    subPanelNavbarTitle.innerHTML = name + "SubPanel";
    var subPanelContent = subPanel.querySelector(".subPanelContent");
    subPanelContent.parentNode.classList.add(name + "SubPanel");
    if (first) {
        subPanelContent.setAttribute("status", "open");
    }
    else {
        subPanelContent.setAttribute("status", "close");
    }
    var subPanelSwitch = subPanel.querySelector(".subPanelSwitch");
    subPanelSwitch.addEventListener("click", function (event) {
        var newStatus = subPanelContent.getAttribute("status") == "open" ? "close" : "open";
        subPanelContent.setAttribute("status", newStatus);
    });
    return subPanel;
}
exports.createSubPanel = createSubPanel;
//@auto-fold here
function createSubPanelItem(name) {
    var subPanelItem = document.createElement("div");
    subPanelItem.classList.add("subPanelItem", name + "SubPanelItem");
    subPanelItem.innerText = name[0];
    subPanelItem.addEventListener("click", function () {
        var subPanelArray = subPanelItem.parentNode.querySelectorAll(".subPanelItem");
        Array.from(subPanelArray).forEach(function (p) {
            console.log(p);
            p.setAttribute("status", "off");
        });
        subPanelItem.setAttribute("status", "on");
    });
    return subPanelItem;
}
exports.createSubPanelItem = createSubPanelItem;
//@auto-fold here
function functionButtonCreater(name, buttonFunction) {
    var functionButton = document.createElement("div");
    functionButton.innerHTML = name;
    functionButton.classList.add("functionButton");
    functionButton.addEventListener("click", buttonFunction);
    return functionButton;
}
exports.functionButtonCreater = functionButtonCreater;
//@auto-fold here
function pageController(currentStatus, subPanelContainer) {
    var leftButton = document.createElement("div");
    var rightButton = document.createElement("div");
    var pageNumberInput = document.createElement("input");
    pageNumberInput.classList.add("pageNumberInput");
    var pageNavigator = document.createElement("div");
    pageNavigator.style.textAlign = "center";
    pageNavigator.style.display = "grid";
    pageNavigator.style.gridTemplateColumns = "1fr 1fr 1fr";
    leftButton.innerHTML = "L";
    pageNumberInput.value = 1;
    pageNumberInput.style.width = "50%";
    pageNumberInput.style.margin = "0 auto";
    rightButton.innerHTML = "R";
    var leftPageArrayDiv = document.createElement("div");
    var rightPageArrayDiv = document.createElement("div");
    pageNavigator.append(leftButton, pageNumberInput, rightButton, leftPageArrayDiv, rightPageArrayDiv);
    subPanelContainer.append(pageNavigator);
    //@auto-fold here
    leftButton.addEventListener("click", function () {
        var totalPageNumber = currentStatus.pageArray.length;
        var currentPageNumber = parseInt(pageNumberInput.value);
        console.log(80, currentPageNumber);
        if (currentPageNumber > 1) {
            var newPageNumber = currentPageNumber - 1;
            pageNumberInput.value = newPageNumber;
            leftPageArrayDiv.innerText = "";
            rightPageArrayDiv.innerText = "";
            for (var i = 1; i < currentPageNumber - 1; i++) {
                leftPageArrayDiv.innerText += i + " ";
                console.log(leftPageArrayDiv.innerText);
            }
            for (var i = currentPageNumber; i < totalPageNumber; i++) {
                rightPageArrayDiv.innerText += i + " ";
                // console.log(rightPageArrayDiv.innerText)
            }
            // currentPage should be
            console.log(currentStatus.pageArray, currentPageNumber);
            currentStatus.pageArray[currentPageNumber].style.left = "+100%";
            currentStatus.pageArray[newPageNumber].style.left = "0%";
        }
    });
    // turn to next page
    //@auto-fold here
    rightButton.addEventListener("click", function () {
        var totalPageNumber = currentStatus.pageArray.length;
        var currentPageNumber = parseInt(pageNumberInput.value);
        if (currentPageNumber < totalPageNumber - 1) {
            var newPageNumber = currentPageNumber + 1;
            pageNumberInput.value = newPageNumber;
            leftPageArrayDiv.innerText = "";
            rightPageArrayDiv.innerText = "";
            for (var i = 1; i < currentPageNumber + 1; i++) {
                leftPageArrayDiv.innerText += i + " ";
                console.log(leftPageArrayDiv.innerText);
            }
            for (var i = currentPageNumber + 2; i < totalPageNumber; i++) {
                rightPageArrayDiv.innerText += i + " ";
                console.log(rightPageArrayDiv.innerText);
            }
            // currentPage should be
            currentStatus.pageArray[currentPageNumber].style.left = "-100%";
            currentStatus.pageArray[newPageNumber].style.left = "0%";
        } // if currentpage > 0
    });
} // right Button
exports.pageController = pageController;
function createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv) {
    var switchViewModeButton = document.createElement("button");
    switchViewModeButton.innerText = "pageMode";
    switchViewModeButton.setAttribute("mode", "pageMode");
    switchViewModeButton.addEventListener("click", function (e) {
        var mode = (switchViewModeButton.getAttribute("mode") == "overviewMode") ? "pageMode" : "overviewMode";
        switchViewModeButton.setAttribute("mode", mode);
        switchViewModeButton.innerText = mode;
        if (mode == "overviewMode") {
            fullPageModeDiv.setAttribute("status", "off");
            overviewModeDiv.setAttribute("status", "on");
            // pageViewHelperFunction.renderOverviewMode()
        }
        else {
            fullPageModeDiv.setAttribute("status", "on");
            overviewModeDiv.setAttribute("status", "off");
            // pageViewHelperFunction.renderFullPageMode()
        }
    });
    return switchViewModeButton;
}
exports.createSwitchViewModeButton = createSwitchViewModeButton;
function updatePageController(currentStatus, newPageNumber) {
    var pageNumberInput = document.querySelector(".pageNumberInput");
    pageNumberInput.value = newPageNumber;
    currentStatus.currentPage = newPageNumber;
    currentStatus.previousPage = newPageNumber - 1;
    currentStatus.newPage = newPageNumber + 1;
}
exports.updatePageController = updatePageController;
function updatePageNumberInNewOrder(currentStatus) {
    for (var i = 1; i < currentStatus.pageArrayFullPage.length; i++) {
        currentStatus.pageArrayFullPage[i].setAttribute("pageNumber", i);
        currentStatus.pageArraySmallView[i].setAttribute("pageNumber", i);
    }
}
exports.updatePageNumberInNewOrder = updatePageNumberInNewOrder;
function createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv, pageToAttach, htmlObject) {
    var newPage;
    var smallView;
    if (htmlObject) {
        // may be better to use a function here
        newPage = htmlObject;
        smallView = htmlObject.cloneNode(true);
    }
    else {
        newPage = document.createElement("div");
        smallView = document.createElement("div");
    }
    newPage.classList.add("divPage");
    smallView.classList.add("divPageSmall");
    // ==========================
    // update page navigators
    // ==========================
    console.log(192, pkmDatabase);
    var dummyNumber = Math.floor(Math.random() * pkmDatabase.length);
    newPage.innerText = "" + pkmDatabase[dummyNumber].name;
    // ==========================
    // add events to smallView
    // ==========================
    var smallViewContent = document.createElement("div");
    smallViewContent.classList.add("smallViewContent");
    var smallViewDescription = document.createElement("div");
    smallViewContent.classList.add("smallViewDescription");
    smallViewDescription.innerText = "" + pkmDatabase[dummyNumber].name;
    smallView.append(smallViewContent, smallViewDescription);
    smallView.style.width = currentStatus.overviewPageSize[0] + "px";
    smallView.style.height = currentStatus.overviewPageSize[1] + "px";
    // if (currentStatus.previousPage) currentStatus.previousPage.style.left = "-100%"
    // ==========================
    // add events to smallView
    // ==========================
    clickEventOfSmallPage(currentStatus, smallView);
    return [newPage, smallView];
}
exports.createNewPage = createNewPage;
function insertNewPage(currentStatus, newFullPage, newSmallView, fullPageModeDiv, overviewModeDiv) {
    // get the new page number
    var newPageNumber = currentStatus.newPageNumber;
    currentStatus.newPageNumber += 1;
    currentStatus.pageArrayFullPage.splice(newPageNumber, 0, newFullPage);
    currentStatus.pageArraySmallView.splice(newPageNumber, 0, newSmallView);
    currentStatus.previousPage = currentStatus.currentPage ? currentStatus.currentPage : null;
    currentStatus.currentPage = newFullPage;
    console.log("currentPageNumber: " + newPageNumber + ", nextPageNumber: " + currentStatus.newPageNumber + ", pageArray: " + currentStatus.pageArray + ", previousPage: " + currentStatus.previousPage + ", currentPage: " + currentStatus.currentPage);
    // ==========================
    // appending new pages to the fullPageModeDiv and overviewModeDiv
    //==========================
    newFullPage.setAttribute("pageNumber", newPageNumber);
    newSmallView.setAttribute("pageNumber", newPageNumber);
    // insert to the one next to the currentPage
    // select the object from the array
    // append the new page to full mode div
    var smallViewContent = newSmallView.querySelector(".smallViewContent");
    smallViewContent.innerText = newPageNumber;
    // first insert to the end of the html
    fullPageModeDiv.append(newFullPage);
    overviewModeDiv.append(newSmallView);
    if (currentStatus.previousPage) {
        fullPageModeDiv.insertBefore(newFullPage, currentStatus.pageArrayFullPage[newPageNumber - 1]);
        fullPageModeDiv.insertBefore(currentStatus.pageArrayFullPage[newPageNumber - 1], newFullPage);
        overviewModeDiv.insertBefore(newSmallView, currentStatus.pageArraySmallView[newPageNumber - 1]);
        overviewModeDiv.insertBefore(currentStatus.pageArraySmallView[newPageNumber - 1], newSmallView);
    }
    // rearrange the pages
    // let currentPageHTMLSmall = document.querySelector(`.divPageSmall[pagenumber='${currentPageNumber}']`)
    // let currentPageHTMLFull = document.querySelector(`.divPage[pagenumber='${currentPageNumber}']`)
    //
    // if (currentPageHTMLSmall){
    //   console.log(241, smallView, currentPageHTMLSmall, currentPageHTMLFull, currentPageNumber)
    //   fullPageModeDiv.insertBefore(newPage, currentPageHTMLFull)
    //   fullPageModeDiv.insertBefore(currentPageHTMLFull, newPage)
    //
    //   overviewModeDiv.insertBefore(smallView, currentPageHTMLSmall)
    //   overviewModeDiv.insertBefore(currentPageHTMLSmall, smallView)
    // } else {
    //   overviewModeDiv.append(smallView)
    //   fullPageModeDiv.append(newPage)
    // }
    //
    //
    // updatePageController(currentStatus, nextPageNumber)
    //
    //
    // // overviewModeDiv.insertBefore(currentPageHTML, smallView)
    // // update small view border
    //
    updatePageNumberInNewOrder(currentStatus);
    // highlight and update the pageNumberInput
    var pageNumberInput = document.querySelector(".pageNumberInput");
    pageNumberInput.value = newPageNumber;
    console.log(pageNumberInput, newPageNumber);
    highlightCurrentPageInOverviewMode(newSmallView, newPageNumber, currentStatus);
}
exports.insertNewPage = insertNewPage;
//@auto-fold here
function createNewPageEvent(currentStatus, fullPageModeDiv, overviewModeDiv, pageToAttach, pageDummyContent, htmlObject) {
    // when click the new page button, a new page is created.
    // add new page fullPageMode
    var clickEventAction = function () {
        var _a = createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv, pageToAttach, htmlObject), newPage = _a[0], smallView = _a[1];
        insertNewPage(currentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv);
    };
    return clickEventAction;
}
exports.createNewPageEvent = createNewPageEvent;
function clickEventOfSmallPage(currentStatus, smallPage) {
    // click
    smallPage.addEventListener("click", function () {
        var clickedPageNumber = smallPage.getAttribute("pageNumber");
        // the next page is the clicked page + 1
        currentStatus.newPageNumber = parseInt(clickedPageNumber) + 1;
        highlightCurrentPageInOverviewMode(smallPage, clickedPageNumber, currentStatus);
        for (var i = 1; i < currentStatus.pageArrayFullPage.length; i++) {
            if (i < clickedPageNumber) {
                // pages before the clicked page
                currentStatus.pageArrayFullPage[i].style.left = "-100vw";
            }
            else if (i == clickedPageNumber) {
                currentStatus.pageArrayFullPage[i].style.left = "0";
            }
            else {
                currentStatus.pageArrayFullPage[i].style.left = "+100vw";
            }
        }
        updatePageController(currentStatus, clickedPageNumber);
    });
}
function highlightCurrentPageInOverviewMode(smallPageView, currentPageNumber, currentStatus) {
    for (var i = 1; i < currentStatus.pageArraySmallView.length; i++) {
        currentStatus.pageArraySmallView[i].style.border = "0px";
    }
    var currentPageHtml = currentStatus.pageArraySmallView[currentPageNumber];
    // smallPageView.parentNode.querySelector(`.divPageSmall[pageNumber='${currentPageNumber}']`)
    currentPageHtml.style.border = "3px red solid";
}
