

export interface usersComments {
  id: string;
  text: string;
  // добавьте другие необходимые поля
}

export interface CommentsSectionProps {
  postId: string;
  initialComments: usersComments[];
}