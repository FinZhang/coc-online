=begin
coc log highlight
一个跑团记录处理工具，将原始的 QQ 群聊天记录处理成美观的适合网页展示的样式

usage: 
1. modify constants
2. shell run `ruby coclog.rb filename`

copyright maliut
=end
# ===== 常量配置部分 start =====

# 输出文件的路径
OUTPUT_FILENAME = "output.txt"

# 玩家昵称
PLAYER_NICKS = ["KP", "零崎人识", "拉尔夫", "投骰姬"]

# ===== 常量配置部分  end  =====

# 合并同一个人的聊天记录
@last_spoken_player = ""
def combine_same_player_record(line)
  arr = line.split
  if arr.size == 2 and PLAYER_NICKS.include? arr[0] and arr[1] =~ /\d:\d\d:\d\d$/  # 认为是昵称和时间信息
    return "" if @last_spoken_player == arr[0]
    @last_spoken_player = arr[0]
  end

  return line
end

# ===== code exec start here =====

if ARGV.empty?
  puts "usage:\n\truby coclog.rb filename"
  exit
end

unless File.file? ARGV.first
  puts "filename not refer to a valid file"
  exit
end

output = File.new(OUTPUT_FILENAME, "w")
pipeline = [:combine_same_player_record]

File.new(ARGV.first, "r").each do |line|
  line_out = pipeline.reduce line do |sum, value|
    sum = self.send value, sum
  end
  # 输出
  output.puts line_out if not line_out.empty?
end