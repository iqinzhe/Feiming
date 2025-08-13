<?php
header("Content-Type: text/plain; charset=utf-8");
$data = json_decode(file_get_contents("php://input"), true);

if(!$data || empty($data["name"])) {
    echo "数据无效";
    exit;
}

$to = "185286930@qq.com";
$subject = "网站表单提交 - " . $data["name"];
$message = "姓名: " . $data["name"] . "\n";
$message .= "编号: " . $data["number"] . "\n";
$message .= "选择的配置:\n" . implode("\n", $data["selections"]) . "\n";
$message .= "备注: " . $data["notes"] . "\n";
$message .= "总价: " . $data["total"] . "\n";
$headers = "From: no-reply@yourdomain.com\r\n";

if(mail($to, $subject, $message, $headers)) {
    echo "提交成功！我们会尽快联系您。";
} else {
    echo "邮件发送失败，请稍后重试。";
}
?>
