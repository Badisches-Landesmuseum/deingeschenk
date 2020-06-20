# Dependencies

PostrgeSQL 11+
NodeJS 12+
FFmpeg 3.4+


# Requirements

aws s3 bucket + cors setup + iam access permissions:

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject",
                    "s3:GetObjectAcl",
                    "s3:GetObject",
                    "s3:AbortMultipartUpload",
                    "s3:PutObjectVersionAcl",
                    "s3:GetObjectTagging",
                    "s3:PutObjectAcl"
                ],
                "Resource": "arn:aws:s3:::bt-gift/*"
            }
        ]
    }
